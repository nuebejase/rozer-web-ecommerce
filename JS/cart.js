// JS/cart.js
const STORAGE_KEY = "rozer_cart";

document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const cartContainer = document.getElementById("cartContainer");
  const totalPriceElement = document.getElementById("totalPrice");
  const cartCountEls = document.querySelectorAll("#cartCount");
  const clearBtn = document.getElementById("clearCartBtn");

  function updateCartCount() {
    cartCountEls.forEach(el => el.textContent = cart.length);
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    updateCartCount();
  }

  function render() {
    updateCartCount();

    if (!cartContainer) return;
    if (cart.length === 0) {
      cartContainer.innerHTML = "<p>Your cart is empty 😢</p>";
      if (totalPriceElement) totalPriceElement.textContent = "Total: ₱0";
      return;
    }

    cartContainer.innerHTML = cart.map((item, idx) => `
      <div class="product-card" style="display:flex;align-items:center;gap:12px;padding:12px;">
        <img src="${item.img}" alt="${item.name}">
        <div style="flex:1">
          <h3 style="margin:0">${item.name}</h3>
          <p style="margin:6px 0">₱${item.price}</p>
          <div style="display:flex;gap:8px;">
            <button class="btn" data-remove="${idx}">Remove</button>
          </div>
        </div>
      </div>
    `).join("");

    const total = cart.reduce((s, it) => s + Number(it.price || 0), 0);
    if (totalPriceElement) totalPriceElement.textContent = `Total: ₱${total}`;
  }

  // remove handler (event delegation)
  document.addEventListener("click", (e) => {
    const rem = e.target.closest("[data-remove]");
    if (!rem) return;
    const idx = parseInt(rem.getAttribute("data-remove"), 10);
    if (Number.isInteger(idx)) {
      cart.splice(idx, 1);
      save();
      render();
    }
  });

  // clear cart
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (!confirm("Clear all items from cart?")) return;
      cart = [];
      save();
      render();
    });
  }

  // initial render
  render();
});
