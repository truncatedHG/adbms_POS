
    const menuData = {
      'Americano': {
        ingredients: [
          { name: 'Espresso beans (14g)', cost: 30 },
          { name: 'Hot water (200ml)',    cost: 5  },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 47
      },
      'Cafe Latte': {
        ingredients: [
          { name: 'Espresso beans (7g)',  cost: 25 },
          { name: 'Fresh milk (200ml)',   cost: 30 },
          { name: 'Vanilla syrup (10ml)', cost: 12 },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 55
      },
      'Snow Cappuccino': {
        ingredients: [
          { name: 'Espresso beans (7g)',  cost: 25 },
          { name: 'Chilled milk (150ml)', cost: 22 },
          { name: 'Ice cream topping',     cost: 25 },
          { name: 'Whipped cream',        cost: 15 },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 65
      },
      'Milkey Chocolate': {
        ingredients: [
          { name: 'Chocolate syrup',      cost: 30 },
          { name: 'Fresh milk (200ml)',   cost: 30 },
          { name: 'Whipped cream',        cost: 15 },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 65
      },
      'Cara Milky': {
        ingredients: [
          { name: 'Milk tea base',        cost: 28 },
          { name: 'Caramel syrup',        cost: 20 },
          { name: 'Fresh milk (180ml)',   cost: 28 },
          { name: 'Pearl topping',        cost: 18 },
          { name: 'Plastic cup & lid',    cost: 10 },
        ],
        labor: 62
      },
      'Honey Ginger Tea': {
        ingredients: [
          { name: 'Tea leaves',           cost: 12 },
          { name: 'Honey',                cost: 18 },
          { name: 'Ginger slices',        cost: 12 },
          { name: 'Water',                cost: 2  },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 50
      },
      'Lemon': {
        ingredients: [
          { name: 'Lemon juice',          cost: 25 },
          { name: 'Sugar syrup',          cost: 10 },
          { name: 'Water',                cost: 2  },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 45
      },
      'Strawberry': {
        ingredients: [
          { name: 'Strawberry puree',     cost: 30 },
          { name: 'Fresh milk (150ml)',   cost: 22 },
          { name: 'Sugar syrup',          cost: 10 },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 48
      },
      'Mango': {
        ingredients: [
          { name: 'Mango puree',          cost: 35 },
          { name: 'Fresh milk (150ml)',   cost: 22 },
          { name: 'Sugar syrup',          cost: 10 },
          { name: 'Paper cup & lid',      cost: 8  },
        ],
        labor: 48
      },
    };
 
    // ── Dialog ──
    let pendingItem = null;
 
    function openDialog(name, price, emoji) {
      pendingItem = { name, price };
      const data = menuData[name];
      const ingredientTotal = data.ingredients.reduce((s, i) => s + i.cost, 0);
 
      document.getElementById('dialogEmoji').textContent = emoji;
      document.getElementById('dialogName').textContent  = name;
      document.getElementById('dialogPrice').textContent = '₱' + price;
 
      const container = document.getElementById('dialogIngredients');
      container.innerHTML = '';
      data.ingredients.forEach(ing => {
        const row = document.createElement('div');
        row.className = 'dialog-ingredient-row';
        row.innerHTML = `<span class="ing-name">${ing.name}</span><span class="ing-cost">₱${ing.cost}</span>`;
        container.appendChild(row);
      });
 
      document.getElementById('dialogIngredientTotal').textContent = '₱' + ingredientTotal;
      document.getElementById('dialogLabor').textContent           = '₱' + data.labor;
      document.getElementById('dialogFinalPrice').textContent      = '₱' + price;
      document.getElementById('dialogAddBtn').textContent          = 'Add to Order';
 
      document.getElementById('dialogOverlay').classList.add('active');
    }
 
    function closeDialogBtn() {
      document.getElementById('dialogOverlay').classList.remove('active');
      pendingItem = null;
    }
 
    function closeDialog(e) {
      if (e.target === document.getElementById('dialogOverlay')) closeDialogBtn();
    }
 
    function confirmAdd() {
      if (!pendingItem) return;
      addToOrder(pendingItem.name, pendingItem.price);
      const btn = document.getElementById('dialogAddBtn');
      btn.textContent = '✔ Added!';
      setTimeout(closeDialogBtn, 700);
    }
 
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDialogBtn(); });
 
    // ── Order ──
    let orderItems = [];
 
    function addToOrder(name, price) {
      const existing = orderItems.find(i => i.name === name);
      if (existing) { existing.qty += 1; }
      else { orderItems.push({ name, price, qty: 1 }); }
      renderOrder();
    }
 
    function changeQty(name, delta) {
      const item = orderItems.find(i => i.name === name);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) orderItems = orderItems.filter(i => i.name !== name);
      renderOrder();
    }
 
    function renderOrder() {
      const list     = document.getElementById('orderList');
      const emptyMsg = document.getElementById('emptyMsg');
      const total    = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
      document.getElementById('totalAmount').textContent = '₱' + total.toLocaleString();
      list.querySelectorAll('.order-row').forEach(el => el.remove());
      if (orderItems.length === 0) { emptyMsg.style.display = 'block'; return; }
      emptyMsg.style.display = 'none';
      orderItems.forEach(item => {
        const row = document.createElement('div');
        row.className = 'order-row';
        row.innerHTML = `
          <span class="order-row-name">${item.name}</span>
          <span class="order-row-cost">₱${item.price}</span>
          <span class="order-row-qty">[${item.qty}]</span>
          <button class="qty-btn" onclick="changeQty('${item.name}', 1)">+</button>
          <button class="qty-btn" onclick="changeQty('${item.name}', -1)">−</button>
        `;
        list.appendChild(row);
      });
    }

    function clearOrder() {
      orderItems = [];
      renderOrder();
    }

    function checkOut() {
      if (orderItems.length === 0) {
        alert('Please add items to your order before checking out.');
        return;
      }
      const total = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
      console.log('Order:', orderItems);
      console.log('Total:', total);
      // TODO: Implement checkout logic (send to backend)
    }
 

