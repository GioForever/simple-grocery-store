// Prices and items
const items = [
  { id: "egg", name: "Egg", price: 10 },
  { id: "instant_noodles", name: "Instant Noodles", price: 10 },
  { id: "softdrinks", name: "Softdrinks", price: 10 },
  { id: "junkfoods", name: "Junkfoods", price: 10 },
  { id: "juices", name: "Juices", price: 10 },
  { id: "sandwiches", name: "Sandwiches", price: 10 },
  { id: "biscuits", name: "Biscuits", price: 10 },
  { id: "mega_sardines", name: "Mega Sardines", price: 20 },
  { id: "bread", name: "Bread", price: 10 },
  { id: "canned_drinks", name: "Canned Drinks", price: 30 },
];

const storeEl = document.getElementById("store");
const grandTotalEl = document.getElementById("grandTotal");
const clearBtn = document.getElementById("clearBtn");

// currency formatter for Philippines peso
const fmt = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP" });

// render items
function render() {
  storeEl.innerHTML = "";
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "item";
    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="price">Price: ${fmt.format(item.price)}</div>
      <div class="controls">
        <label>Qty:
          <input type="number" min="0" value="0" data-id="${item.id}" />
        </label>
        <div class="itemSubtotal" id="sub_${item.id}">${fmt.format(0)}</div>
      </div>
    `;
    storeEl.appendChild(card);
  });

  // attach change listeners
  const inputs = storeEl.querySelectorAll('input[type="number"]');
  inputs.forEach(inp => {
    inp.addEventListener("input", onQtyChange);
  });
}

// handle quantity change
function onQtyChange(e){
  const id = e.target.dataset.id;
  let qty = parseInt(e.target.value || "0", 10);
  if (isNaN(qty) || qty < 0) qty = 0;
  e.target.value = qty; // sanitize

  const item = items.find(it => it.id === id);
  const subtotal = qty * item.price;
  document.getElementById(`sub_${id}`).textContent = fmt.format(subtotal);
  updateGrandTotal();
}

// calculate and update grand total
function updateGrandTotal(){
  let total = 0;
  const inputs = storeEl.querySelectorAll('input[type="number"]');
  inputs.forEach(inp => {
    const id = inp.dataset.id;
    const qty = parseInt(inp.value || "0", 10) || 0;
    const item = items.find(it => it.id === id);
    total += qty * item.price;
  });
  grandTotalEl.textContent = fmt.format(total);
}

// clear all quantities
clearBtn.addEventListener("click", () => {
  const inputs = storeEl.querySelectorAll('input[type="number"]');
  inputs.forEach(i => i.value = 0);
  storeEl.querySelectorAll('.itemSubtotal').forEach(s => s.textContent = fmt.format(0));
  updateGrandTotal();
});

// initial render
render();
updateGrandTotal();