// Global State
let currentQty = 0;

// Element Selectors
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const qtyDisplay = document.getElementById('quantityDisplay');
const tableBody = document.getElementById('tableBody');
const productDateInput = document.getElementById('productDate');

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Set initial date display
    if (productDateInput) {
        productDateInput.value = new Date().toLocaleDateString();
    }
    loadInventory();
});

// --- QUANTITY CONTROLS ---
document.getElementById('increaseBtn').onclick = () => {
    currentQty++;
    updateQtyDisplay();
};

document.getElementById('decreaseBtn').onclick = () => {
    if (currentQty > 0) {
        currentQty--;
        updateQtyDisplay();
    }
};

function updateQtyDisplay() {
    qtyDisplay.innerText = currentQty;
}

// --- CRUD: READ (Fetch Active Items) ---
async function loadInventory() {
    try {
        const response = await fetch('http://localhost:8080/inventory/all');
        const data = await response.json();
        
        tableBody.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            
            // Row Click: Populate form for Update/Delete
            row.onclick = () => {
                productIdInput.value = item.stockId; 
                productNameInput.value = item.stockName;
                currentQty = item.stock;
                updateQtyDisplay();
                
                // Highlight Selection
                document.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
                row.classList.add('selected');
            };

            row.innerHTML = `
                <td>${item.stockId}</td>
                <td>${item.stockName}</td>
                <td>${item.stock}</td>
                <td>${new Date().toLocaleDateString()}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Failed to load inventory:", error);
    }
}

document.getElementById('addBtn').onclick = async () => {
    const name = productNameInput.value.trim();
    
    if (!name) {
        alert("Please enter a Product Name.");
        return;
    }

    // Ensure stock is a proper number, not a string
    const itemData = {
        stockName: name,
        stock: Number(currentQty),
        active: true
    };

    console.log("Sending Add Payload:", itemData);

    const response = await fetch('http://localhost:8080/inventory/add-stock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });

    if (response.ok) {
        alert("Stock added/updated!");
        loadInventory();
        clearForm();
    } else {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        alert(`Error 400: Check console for JSON mismatch.`);
    }
};

document.getElementById('updateBtn').onclick = async () => {
    const id = productIdInput.value;
    const name = productNameInput.value.trim();

    if (!id) {
        alert("Select an item from the table first.");
        return;
    }

    const itemData = {
        stockId: parseInt(id), // Must be an Integer
        stockName: name,
        stock: Number(currentQty),
        active: true
    };

    console.log("Sending Update Payload:", itemData);

    const response = await fetch('http://localhost:8080/inventory/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData)
    });

    if (response.ok) {
        alert("Update successful!");
        loadInventory();
        clearForm();
    } else {
        alert("Update failed (Error 400).");
    }
};

// --- CRUD: DELETE (Soft Delete) ---
// Logic: Calls the backend to set active = false.
document.getElementById('deleteBtn').onclick = async () => {
    const id = productIdInput.value;
    
    if (!id) {
        alert("Select an item to delete.");
        return;
    }

    if (confirm(`Are you sure you want to delete Stock ID ${id}?`)) {
        try {
            const response = await fetch(`http://localhost:8080/inventory/delete/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert("Item removed from active inventory.");
                loadInventory();
                clearForm();
            } else {
                alert("Delete failed. It might be linked to other data.");
            }
        } catch (error) {
            console.error("Delete Error:", error);
        }
    }
};

// --- UI HELPER ---
function clearForm() {
    productIdInput.value = '';
    productNameInput.value = '';
    currentQty = 0;
    updateQtyDisplay();
    document.querySelectorAll('tr').forEach(r => r.classList.remove('selected'));
}