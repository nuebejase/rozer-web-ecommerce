// JS/products.js
// Products data
const products = [
  { id: 1, name: "RIIZE Album", price: 499, img: "Images/RIIZE.jpg", description: "The latest RIIZE album featuring hit tracks and premium photo cards." },
  { id: 2, name: "RIIZE Album Ver.2", price: 499, img: "Images/RIIZE1.jpg", description: "Alternate version of the RIIZE album with exclusive artwork." },
  { id: 3, name: "RIIZE Album Ver.3", price: 499, img: "Images/RIIZE2.jpg", description: "Special edition RIIZE album with rare collectibles." },
  { id: 4, name: "Red Velvet Album", price: 499, img: "Images/RV.jpg", description: "A colorful and powerful album from Red Velvet." },
  { id: 5, name: "IVE Album Ver.1", price: 499, img: "Images/IVE1.jpg", description: "IVE's fresh and elegant album version 1." },
  { id: 6, name: "IVE Album Ver.2", price: 499, img: "Images/IVE2.jpg", description: "IVE's album version 2 with special concept photos." },
  { id: 7, name: "TWICE Album", price: 499, img: "Images/TWICE1.jpg", description: "TWICE’s energetic and iconic album." },
  { id: 8, name: "NewJeans Album", price: 499, img: "Images/NWJ.jpg", description: "Trendy and aesthetic album from NewJeans." },
  { id: 9, name: "ILLIT Album", price: 499, img: "Images/ILLIT1.jpg", description: "ILLIT’s stunning debut album." }
];

const STORAGE_KEY = "rozer_cart";

let cart = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function updateCartCount() {
  const els = document.querySelectorAll("#cartCount");
  els.forEach(el => el.textContent = cart.length);
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  updateCartCount();
}

function addToCartById(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  cart.push(p);
  saveCart();
  alert(`${p.name} added to cart!`);
}

function openModalById(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const modal = document.getElementById("modal");
  document.getElementById("modalImg").src = p.img;
  document.getElementById("modalImg").alt = p.name;
  document.getElementById("modalTitle").textContent = p.name;
  document.getElementById("modalDescription").textContent = p.description;
  document.getElementById("modalPrice").textContent = `₱${p.price}`;

  const addBtn = document.getElementById("modalAddCart");
  const newAddBtn = addBtn.cloneNode(true);
  addBtn.parentNode.replaceChild(newAddBtn, addBtn);
  newAddBtn.addEventListener("click", () => {
    addToCartById(p.id);
    closeModal();
  });

  modal.setAttribute("aria-hidden", "false");
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
}

function renderProducts() {
  const container = document.getElementById("productsContainer");
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₱${p.price}</p>
      <div style="display:flex;gap:8px;justify-content:center;margin-top:8px">
        <button class="btn" data-add="${p.id}">Add to Cart</button>
        <button class="btn" data-view="${p.id}">View Details</button>
      </div>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderProducts();

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  const modal = document.getElementById("modal");
  if (modal) modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const container = document.getElementById("productsContainer");
  if (container) {
    container.addEventListener("click", (e) => {
      const add = e.target.closest("[data-add]");
      if (add) {
        const id = parseInt(add.getAttribute("data-add"), 10);
        addToCartById(id);
        return;
      }
      const view = e.target.closest("[data-view]");
      if (view) {
        const id = parseInt(view.getAttribute("data-view"), 10);
        openModalById(id);
      }
    });
  }
});
