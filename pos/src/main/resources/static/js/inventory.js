let quantity = 0;
let selectedRow = null;

const productId      = document.getElementById('productId');
const productName    = document.getElementById('productName');
const productDate    = document.getElementById('productDate');
const quantityDisplay = document.getElementById('quantityDisplay');
const tableBody      = document.getElementById('tableBody');

// Set today's date as default
const today = new Date();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');
const yyyy = today.getFullYear();
productDate.value = `${mm}/${dd}/${yyyy}`;

// Quantity controls
document.getElementById('increaseBtn').addEventListener('click', () => {
  quantity++;
  quantityDisplay.textContent = quantity;
});

document.getElementById('decreaseBtn').addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    quantityDisplay.textContent = quantity;
  }
});

// Add row
document.getElementById('addBtn').addEventListener('click', () => {
  const id   = productId.value.trim();
  const name = productName.value.trim();
  const date = productDate.value.trim();

  if (!id || !name || !date) {
    alert('Please fill in all fields.');
    return;
  }

  // Find first empty row or append
  const rows = tableBody.querySelectorAll('tr');
  let placed = false;

  for (let row of rows) {
    const cells = row.querySelectorAll('td');
    if (!cells[0].textContent.trim()) {
      cells[0].textContent = id;
      cells[1].textContent = name;
      cells[2].textContent = quantity;
      cells[3].textContent = date;
      placed = true;
      break;
    }
  }

  if (!placed) {
    const newRow = tableBody.insertRow();
    newRow.innerHTML = `<td>${id}</td><td>${name}</td><td>${quantity}</td><td>${date}</td>`;
    addRowClickListener(newRow);
  }

  clearForm();
});


document.getElementById('deleteBtn').addEventListener('click', () => {
  if (!selectedRow) {
    alert('Please select a row to delete.');
    return;
  }
  const cells = selectedRow.querySelectorAll('td');
  cells[0].textContent = '';
  cells[1].textContent = '';
  cells[2].textContent = '';
  cells[3].textContent = '';
  selectedRow.classList.remove('selected');
  selectedRow = null;
  clearForm();
});


document.getElementById('updateBtn').addEventListener('click', () => {
  if (!selectedRow) {
    alert('Please select a row to update.');
    return;
  }

  const id   = productId.value.trim();
  const name = productName.value.trim();
  const date = productDate.value.trim();

  if (!id || !name || !date) {
    alert('Please fill in all fields.');
    return;
  }

  const cells = selectedRow.querySelectorAll('td');
  cells[0].textContent = id;
  cells[1].textContent = name;
  cells[2].textContent = quantity;
  cells[3].textContent = date;

  selectedRow.classList.remove('selected');
  selectedRow = null;
  clearForm();
});

function addRowClickListener(row) {
  row.addEventListener('click', () => {
    if (selectedRow) selectedRow.classList.remove('selected');
    selectedRow = row;
    row.classList.add('selected');

    const cells = row.querySelectorAll('td');
    productId.value    = cells[0].textContent;
    productName.value  = cells[1].textContent;
    quantity           = parseInt(cells[2].textContent) || 0;
    quantityDisplay.textContent = quantity;
    productDate.value  = cells[3].textContent;
  });
}


tableBody.querySelectorAll('tr').forEach(addRowClickListener);

function clearForm() {
  productId.value   = '';
  productName.value = '';
  quantity = 0;
  quantityDisplay.textContent = 0;
  productDate.value = `${mm}/${dd}/${yyyy}`;
}