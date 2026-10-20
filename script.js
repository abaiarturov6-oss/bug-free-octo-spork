document.title = 'COURT/24 — Basketball store';
const orderStyle = document.createElement('style');
orderStyle.textContent = `.order-modal{position:fixed;z-index:12;inset:0;background:#0009;display:grid;place-items:center;opacity:0;pointer-events:none;transition:.25s}.order-modal.open{opacity:1;pointer-events:auto}.order-box{position:relative;background:var(--cream);width:min(500px,92vw);padding:38px}.close-order{position:absolute;right:22px;top:18px;border:0;background:none;font-size:28px}.order-box h2{font:400 54px/.85 Anton;margin:22px 0 30px}.order-box h2 i{font-style:normal;color:var(--orange)}#orderForm{display:grid;gap:16px}#orderForm label{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase}#orderForm input,#orderForm select{display:block;width:100%;border:0;border-bottom:1px solid #aaa;background:transparent;padding:10px 0;font:13px DM Sans;outline:0}.submit-order{border:0;background:var(--black);color:#fff;padding:16px;text-align:left;font-size:12px;margin-top:10px}.submit-order span{float:right;color:var(--lime);font-size:18px}.order-success{display:none;background:var(--lime);padding:18px;font-size:13px;line-height:1.5}.order-success.show{display:block}@media(max-width:760px){nav.mobile-open{display:flex;position:absolute;top:70px;left:0;right:0;background:var(--cream);padding:18px 6vw;z-index:6;border-bottom:1px solid var(--line);gap:20px;flex-wrap:wrap}}`;
document.head.appendChild(orderStyle);
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product');
filters.forEach(filter => filter.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  filter.classList.add('active');
  const value = filter.dataset.filter;
  products.forEach(product => { product.style.display = value === 'all' || product.dataset.category === value ? '' : 'none'; });
}));

const cart = document.querySelector('.cart');
const overlay = document.querySelector('.overlay');
const cartItems = document.querySelector('.cart-items');
const bagCount = document.querySelector('#bagCount');
const cartTotal = document.querySelector('.cart-total strong');
const items = [];
const openCart = () => { cart.classList.add('open'); overlay.classList.add('open'); };
const closeCart = () => { cart.classList.remove('open'); overlay.classList.remove('open'); };
document.querySelector('.bag-btn').addEventListener('click', openCart);
document.querySelector('.close-cart').addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);
const orderModal = document.querySelector('.order-modal');
document.querySelector('.checkout').addEventListener('click', () => {
  if (!items.length) return alert('Добавьте товар в корзину');
  closeCart(); orderModal.classList.add('open');
});
document.querySelector('.close-order').addEventListener('click', () => orderModal.classList.remove('open'));
document.querySelector('#orderForm').addEventListener('submit', event => {
  event.preventDefault();
  event.target.style.display = 'none';
  document.querySelector('.order-success').classList.add('show');
  items.length = 0; bagCount.textContent = '0'; cartItems.innerHTML = ''; cartTotal.textContent = '0 ₽';
});
document.querySelectorAll('.quick-add').forEach(button => button.addEventListener('click', event => {
  const product = event.target.closest('.product');
  items.push({name: product.dataset.name, price: Number(product.dataset.price)});
  bagCount.textContent = items.length;
  cartItems.innerHTML = items.map((item, index) => `<div class="cart-item"><div>${item.name}<small>Размер: универсальный</small></div><strong>${item.price.toLocaleString('ru-RU')} ₽</strong></div>`).join('');
  cartTotal.textContent = `${items.reduce((sum, item) => sum + item.price, 0).toLocaleString('ru-RU')} ₽`;
  openCart();
}));
const menu = document.querySelector('nav');
document.querySelector('.menu-toggle').addEventListener('click', () => menu.classList.toggle('mobile-open'));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.classList.remove('mobile-open')));
