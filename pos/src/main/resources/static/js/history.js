const STORAGE_KEY = 'unspoken_order_history';
const SEED_HISTORY = [
  {
    product:   'Americano',
    orderId:   'ORD-001',
    qty:       2,
    price:     90,
    productId: 'PRD-001',
    date:      '05/08/2026',
  }
];

function loadHistory() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (parsed.length > 0 && (!parsed[0].orderId || !parsed[0].productId)) {
        saveHistory(SEED_HISTORY);
        return [...SEED_HISTORY];
      }
      return parsed;
    } catch {
      saveHistory(SEED_HISTORY);
      return [...SEED_HISTORY];
    }
  }
  saveHistory(SEED_HISTORY);
  return [...SEED_HISTORY];
}

function saveHistory(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

const MIN_ROWS = 10;

function renderTable(data) {
  const tbody = document.getElementById('orderTableBody');
  tbody.innerHTML = '';

  data.forEach(order => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escHtml(order.product)}</td>
      <td>${escHtml(order.orderId)}</td>
      <td>${escHtml(String(order.qty))}</td>
      <td>${formatTotal(order.qty, order.price)}</td>
      <td>${escHtml(order.productId)}</td>
      <td>${escHtml(order.date)}</td>
    `;
    tbody.appendChild(tr);
  });

  const remaining = Math.max(0, MIN_ROWS - data.length);
  for (let i = 0; i < remaining; i++) {
    const tr = document.createElement('tr');
    tr.className = 'empty-row';
    tr.innerHTML = `<td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td>`;
    tbody.appendChild(tr);
  }
}

function formatTotal(qty, price) {
  if (qty === 1) return `\u20b1${price}`;
  const parts = Array(qty).fill(`${price}`).join('+');
  return `${parts}=${price * qty}`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function generateOrderId(n)   { return 'ORD-' + String(n + 1).padStart(3, '0'); }
function generateProductId(n) { return 'PRD-' + String(n + 1).padStart(3, '0'); }

function getTodayDate() {
  const d = new Date();
  return [
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
    d.getFullYear(),
  ].join('/');
}

function addOrderToHistory(items) {
  const history  = loadHistory();
  const dateStr  = getTodayDate();

  items.forEach((item, index) => {
    history.unshift({
      product:   item.name,
      orderId:   generateOrderId(history.length + index),
      qty:       item.qty,
      price:     item.price,
      productId: generateProductId(index),
      date:      dateStr,
    });
  });

  saveHistory(history);
}

window.addOrderToHistory = addOrderToHistory;

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  renderTable(loadHistory());
});