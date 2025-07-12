// Currency and Language Dropdown Handling
const currencyList = document.getElementById('currencyList');
const selectedCurrency = document.getElementById('selectedCurrency');
const languageList = document.getElementById('languageList');
const selectedLanguage = document.getElementById('selectedLanguage');
const languageSearch = document.getElementById('languageSearch');

currencyList.querySelectorAll('div').forEach(div => {
  div.addEventListener('click', () => {
    selectedCurrency.textContent = div.getAttribute('data-currency');
    updatePrices(selectedCurrency.textContent);
  });
});

languageList.querySelectorAll('div').forEach(div => {
  div.addEventListener('click', () => {
    selectedLanguage.textContent = div.getAttribute('data-name');
    alert(`Language changed to ${selectedLanguage.textContent}`);
  });
});

languageSearch.addEventListener('input', () => {
  const query = languageSearch.value.toLowerCase();
  languageList.querySelectorAll('div').forEach(div => {
    const name = div.getAttribute('data-name').toLowerCase();
    div.style.display = name.includes(query) ? 'block' : 'none';
  });
});

// Currency Symbol helper
function getCurrencySymbol(currency) {
  switch(currency) {
    case 'USD': return '$';
    case 'EUR': return '€';
    case 'GBP': return '£';
    case 'SAR': return 'ر.س';
    case 'PKR': return '₨';
    default: return '$';
  }
}

// Update cake prices according to selected currency
function updatePrices(currency) {
  const rate = currencyList.querySelector(`div[data-currency="${currency}"]`).getAttribute('data-rate');
  document.querySelectorAll('.item-card').forEach(card => {
    const basePrice = parseFloat(card.getAttribute('data-price'));
    const newPrice = (basePrice * rate).toFixed(2);
    card.querySelector('.price').textContent = `Price: ${getCurrencySymbol(currency)}${newPrice}`;
    card.setAttribute('data-current-price', newPrice);
  });
}

// CART LOGIC
const cart = [];
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItemsList = document.getElementById('cartItems');
const closeCartBtn = document.getElementById('closeCart');

function updateCartCount() {
  let totalQty = cart.reduce((acc, item) => acc + item.quantity, 0);
  cartCount.textContent = totalQty;
}

// Add to cart buttons
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.item-card');
    const id = card.getAttribute('data-id');
    const name = card.querySelector('h3').textContent;
    const price = parseFloat(card.getAttribute('data-current-price') || card.getAttribute('data-price'));
    const existing = cart.find(item => item.id === id);
    if(existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, quantity: 1, price });
    }
    updateCartCount();
    alert(`${name} added to cart.`);
  });
});

// Cart modal toggle
cartIcon.addEventListener('click', () => {
  renderCartItems();
  cartModal.style.display = 'block';
});
closeCartBtn.addEventListener('click', () => {
  cartModal.style.display = 'none';
});
window.addEventListener('click', e => {
  if(e.target === cartModal) cartModal.style.display = 'none';
});

// Render cart items
function renderCartItems() {
  cartItemsList.innerHTML = '';
  if(cart.length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    return;
  }
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - Quantity: ${item.quantity} - Price: ${getCurrencySymbol(selectedCurrency.textContent)}${(item.price * item.quantity).toFixed(2)}`;
    cartItemsList.appendChild(li);
  });
}

// FAVOURITES LOGIC
const favs = [];
const favIcon = document.getElementById('favouritesIcon');
const favModal = document.getElementById('favModal');
const favItemsList = document.getElementById('favItems');
const closeFavBtn = document.getElementById('closeFav');

document.querySelectorAll('.fav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.baker-card');
    const id = btn.getAttribute('data-id');
    const name = card.querySelector('h3').textContent;
    if(!favs.includes(id)) {
      favs.push(id);
      alert(`${name} added to favourites.`);
    } else {
      alert(`${name} is already in favourites.`);
    }
  });
});

favIcon.addEventListener('click', () => {
  renderFavItems();
  favModal.style.display = 'block';
});
closeFavBtn.addEventListener('click', () => {
  favModal.style.display = 'none';
});
window.addEventListener('click', e => {
  if(e.target === favModal) favModal.style.display = 'none';
});

function renderFavItems() {
  favItemsList.innerHTML = '';
  if(favs.length === 0) {
    favItemsList.innerHTML = '<li>No favourites added.</li>';
    return;
  }
  favs.forEach(id => {
    const baker = document.querySelector(`.fav-btn[data-id="${id}"]`).closest('.baker-card');
    const name = baker.querySelector('h3').textContent;
    const li = document.createElement('li');
    li.textContent = name;
    favItemsList.appendChild(li);
  });
}

// CAKES SOLD ANIMATION
const cakeCounter = document.getElementById('cakeCounter');
let cakesSold = 0;
const targetCakesSold = 10000;
const incrementSpeed = 25; // ms

function animateCakesSold() {
  if(cakesSold < targetCakesSold) {
    cakesSold += Math.ceil(targetCakesSold / 200);
    if(cakesSold > targetCakesSold) cakesSold = targetCakesSold;
    cakeCounter.textContent = cakesSold.toLocaleString();
    setTimeout(animateCakesSold, incrementSpeed);
  }
}
animateCakesSold();

// ORDER FORM
const orderForm = document.getElementById('orderForm');
orderForm.addEventListener('submit', e => {
  e.preventDefault();
  alert('Thank you for your order! We will contact you soon.');
  orderForm.reset();
});

// ORDER NOW BUTTON scrolls to order form
document.getElementById('orderNowBtn').addEventListener('click', () => {
  document.getElementById('orderCake').scrollIntoView({ behavior: 'smooth' });
});

// CUSTOMIZE CAKE BUTTON alert placeholder
document.getElementById('customizeCakeBtn').addEventListener('click', () => {
  alert('Customize your cake feature coming soon!');
});
