const productGrid = document.getElementById("productGrid");
const cartList = document.getElementById("cartList");
const totalCartElem = document.getElementById("totalCart");

// Fixed Database with Working English Content
let productsDB = [
  {
    id: 1,
    title: "Z1 Premium Headphones",
    price: 599.0,
    desc: "Immersive sound with active noise cancellation.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 2,
    title: "Elite Smartwatch",
    price: 849.9,
    desc: "Real-time health monitoring and notifications.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
  },
  {
    id: 3,
    title: "Bass Bluetooth Speaker",
    price: 450.0,
    desc: "Crystal clear sound for your home or office.",
    image: "https://images.unsplash.com/photo-1608156639585-b3a032ef9689?w=500",
  },
  {
    id: 4,
    title: "Retro Pro Camera",
    price: 2400.0,
    desc: "Classic style meets high-end digital technology.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
  },
];

let cart = [];

// Rendering Function
function renderVitrine() {
  productGrid.innerHTML = "";
  productsDB.forEach((p) => {
    const inCart = cart.some((item) => item.id === p.id);
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
            <img src="${p.image}" class="product-image" alt="${p.title}" onclick="openZoom('${p.image}')">
            <div class="product-info">
                <h3 class="product-title">${p.title}</h3>
                <p class="product-price">$ ${p.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                <button onclick="toggleCart(${p.id})" class="add-to-cart" style="background: ${inCart ? "#10b981" : "#2563eb"}">
                    ${inCart ? "✓ In Cart" : "Add to Cart"}
                </button>
                <button onclick="deleteProduct(${p.id})" class="delete-btn">Remove from Store</button>
            </div>
        `;
    productGrid.appendChild(card);
  });
}

// Cart Logic
function toggleCart(id) {
  const prod = productsDB.find((p) => p.id === id);
  const index = cart.findIndex((item) => item.id === id);
  if (index === -1) {
    cart.push(prod);
  } else {
    cart.splice(index, 1);
  }
  updateCart();
  renderVitrine();
}

function updateCart() {
  cartList.innerHTML = cart.length
    ? ""
    : '<p class="empty-msg">Your cart is empty.</p>';
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    cartList.innerHTML += `
            <div class="item-cart">
                <span>${item.title}</span>
                <span style="font-weight:600">$ ${item.price.toFixed(2)}</span>
            </div>`;
  });
  totalCartElem.innerText = total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
  });
}

function deleteProduct(id) {
  productsDB = productsDB.filter((p) => p.id !== id);
  cart = cart.filter((i) => i.id !== id);
  renderVitrine();
  updateCart();
}

// Zoom Logic
window.openZoom = (src) => {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("imgZoomed");
  modal.style.display = "block";
  modalImg.src = src;
};

document.querySelector(".close-modal").onclick = () => {
  document.getElementById("imageModal").style.display = "none";
};

// Side Drawer Logic
document.getElementById("openFormBtn").onclick = () =>
  document.getElementById("productDrawer").classList.add("open");
document.getElementById("closeDrawerBtn").onclick = () =>
  document.getElementById("productDrawer").classList.remove("open");

document.getElementById("saveProductBtn").onclick = () => {
  const t = document.getElementById("formTitle").value;
  const p = parseFloat(document.getElementById("formPrice").value);
  const d = document.getElementById("formDesc").value;
  const i =
    document.getElementById("formImg").value ||
    "https://images.unsplash.com/photo-1583394838336-acd97773cf3f?w=500";

  if (t && p) {
    productsDB.push({ id: Date.now(), title: t, price: p, desc: d, image: i });
    renderVitrine();
    document.getElementById("productDrawer").classList.remove("open");
    // Clear inputs
    document.getElementById("formTitle").value = "";
    document.getElementById("formPrice").value = "";
    document.getElementById("formDesc").value = "";
    document.getElementById("formImg").value = "";
  }
};

// Search Logic
document.getElementById("searchBtn").onclick = () => {
  const term = document.getElementById("searchInput").value.toLowerCase();
  document.querySelectorAll(".product-card").forEach((card) => {
    const title = card.querySelector(".product-title").innerText.toLowerCase();
    card.style.display = title.includes(term) ? "flex" : "none";
  });
};

renderVitrine();
