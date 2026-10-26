const menuData = [
  {
    id: 1,
    title: "Nasi Lemak",
    price: "RM 12.00",
    category: "malaysian",
    tagline: "The heart of Malaysia on a plate.",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Coconut rice", "Sambal (chili paste)", "Fried anchovies (ikan bilis)", "Peanuts", "Boiled egg", "Cucumber"]
  },
  {
    id: 2,
    title: "Chicken Rice",
    price: "RM 10.00",
    category: "malaysian",
    tagline: "Simple, yet unforgettable.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Hainanese chicken", "Fragrant rice", "Ginger & garlic sauce", "Chili sauce", "Cucumber"]
  },
  {
    id: 3,
    title: "Nasi Goreng Kampung",
    price: "RM 9.00",
    category: "malaysian",
    tagline: "Smoky, flavourful, just like home.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Rice", "Egg", "Anchovies (ikan bilis)", "Chili paste", "Vegetables (carrot, cabbage, beans)"]
  },
  {
    id: 4,
    title: "Mee Goreng Mamak",
    price: "RM 9.00",
    category: "malaysian",
    tagline: "Spicy, savoury, addictive.",
    image: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Yellow noodles", "Prawns / chicken", "Egg", "Vegetables (cabbage, carrot, beans)", "Mamak-style spices & chili paste"]
  },
  {
    id: 5,
    title: "Ayam Masak Merah",
    price: "RM 11.00",
    category: "malaysian",
    tagline: "Sweet, spicy, full of flavour.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Chicken", "Onion", "Tomato sauce", "Chili paste", "Bell peppers", "Mixed spices"]
  },
  {
    id: 6,
    title: "Chicken Briyani",
    price: "RM 16.00",
    category: "indian",
    tagline: "Aromatic, rich, satisfying.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Basmati rice", "Chicken", "Onions", "Tomatoes", "Spices (cinnamon, cardamom, cloves, bay leaf)", "Yogurt"]
  },
  {
    id: 7,
    title: "Butter Chicken (Murgh Makhani)",
    price: "RM 15.00",
    category: "indian",
    tagline: "Rich, creamy, and full of flavour.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Tender chicken pieces", "Tomato and butter gravy", "Cream", "Kasuri methi (fenugreek)", "Aromatic spices"]
  },
  {
    id: 8,
    title: "Grilled Chicken Chop",
    price: "RM 16.00",
    category: "western",
    tagline: "Juicy, tender, satisfying.",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Chicken thigh/breast", "Herbs & spices", "Butter", "Fries", "Mix salad", "Black pepper sauce"]
  },
  {
    id: 9,
    title: "Spaghetti Bolognese",
    price: "RM 15.00",
    category: "western",
    tagline: "Creamy, cheesy, classic.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Spaghetti", "Chicken ham / turkey bacon", "Egg yolk", "Parmesan cheese", "Garlic", "Cream"]
  },
  {
    id: 10,
    title: "Sandwiches & Wraps",
    price: "RM 12.00",
    category: "western",
    tagline: "Freshly packed, quick and delicious.",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80",
    ingredients: ["Grilled chicken", "Fresh lettuce", "Tomatoes", "Cheese", "Mayo", "Toasted bread / tortilla wrap"]
  }
];

// --- 购物车数据与逻辑 ---
let cart = [];

function addToCart(id) {
  const item = menuData.find(m => m.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQuantity(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
}

function updateCartUI() {
  const cartCount = document.getElementById('cartCount');
  const cartCountMobile = document.getElementById('cartCountMobile');
  const cartItemsContainer = document.getElementById('cartItems');
  const cartTotalElement = document.getElementById('cartTotal');
  
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.innerText = totalCount;
  if (cartCountMobile) cartCountMobile.innerText = totalCount;

  if (cartItemsContainer) {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p style="text-align:center; color:rgba(87,34,24,0.6); margin-top:2rem;">Your cart is empty 🛒</p>';
    } else {
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-row">
          <div>
            <strong>${item.title}</strong><br>
            <small>${item.price}</small>
          </div>
          <div style="display:flex; align-items:center; gap:0.375rem;">
            <button onclick="changeQuantity(${item.id}, -1)" style="padding:0.125rem 0.375rem; cursor:pointer;">-</button>
            <span>${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)" style="padding:0.125rem 0.375rem; cursor:pointer;">+</button>
            <button onclick="removeFromCart(${item.id})" style="background:none; border:none; color:red; cursor:pointer; margin-left:0.25rem;">🗑️</button>
          </div>
        </div>
      `).join('');
    }
  }

  if (cartTotalElement) {
    const totalPrice = cart.reduce((sum, item) => {
      const numericPrice = parseFloat(item.price.replace('RM ', ''));
      return sum + numericPrice * item.quantity;
    }, 0);
    cartTotalElement.innerText = `RM ${totalPrice.toFixed(2)}`;
  }
}

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.toggle('open');
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.add('open');
}

function checkoutWhatsApp() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  let message = "Hello Choongs Feast! I would like to place an order:%0A%0A";
  let total = 0;
  cart.forEach(item => {
    const itemTotal = parseFloat(item.price.replace('RM ', '')) * item.quantity;
    total += itemTotal;
    message += `- ${item.title} (${item.price}) x ${item.quantity} = RM ${itemTotal.toFixed(2)}%0A`;
  });
  message += `%0A*Total: RM ${total.toFixed(2)}*%0APlease let me know the next steps. Thank you!`;

  const phone = "60123456789";
  window.open("https://wa.me/" + phone + "?text=" + message, '_blank');
}

// 移动端菜单
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// 渲染菜单
function renderMenu(items) {
  const menuGrid = document.getElementById('menuGrid');
  if (!menuGrid) return;
  
  menuGrid.innerHTML = '';

  items.forEach(item => {
    const card = document.createElement('div');
    card.className = "food-card";
    
    let ingredientsHtml = '';
    if (item.ingredients && item.ingredients.length > 0) {
      ingredientsHtml = item.ingredients
        .map(ing => '<li><span class="bullet">•</span>' + ing + '</li>')
        .join('');
    }

    card.innerHTML = 
      '<div>' +
        '<div class="card-image-container">' +
          '<img src="' + item.image + '" alt="' + item.title + '" class="card-image">' +
        '</div>' +
        '<div class="card-header">' +
          '<h3 class="card-title">' + item.title + '</h3>' +
          '<span class="card-price">' + item.price + '</span>' +
        '</div>' +
        '<p class="card-tagline">"' + item.tagline + '"</p>' +
        '<div class="card-ingredients">' +
          '<ul class="ingredients-list">' + ingredientsHtml + '</ul>' +
        '</div>' +
      '</div>' +
      '<button onclick="addToCart(' + item.id + ')" class="btn-order">Add to Cart 🛒</button>';

    menuGrid.appendChild(card);
  });
}

function filterMenu(category, e) {
  const buttons = document.querySelectorAll('.tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));

  if (e && e.target) {
    e.target.classList.add('active');
  }

  if (category === 'all') {
    renderMenu(menuData);
  } else {
    const filtered = menuData.filter(item => item.category === category);
    renderMenu(filtered);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('menuGrid')) {
    renderMenu(menuData);
  }
  updateCartUI();
});