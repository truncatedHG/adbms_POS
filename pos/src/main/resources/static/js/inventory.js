function increaseQty() {
    let qtyInput = document.getElementById("quantity");
    qtyInput.value = parseInt(qtyInput.value || 0) + 1;
}

function decreaseQty() {
    let qtyInput = document.getElementById("quantity");

    let currentValue = parseInt(qtyInput.value || 0);

    if (currentValue > 0) {
        qtyInput.value = currentValue - 1;
    }
}