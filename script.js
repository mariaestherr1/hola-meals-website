const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? 'Close' : 'Menu';
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu';
  });
});

document.querySelector('#news-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#news-name').value.trim();
  const email = document.querySelector('#news-email').value.trim();
  const subject = `Hola Meals! news signup — ${name}`;
  const body = [
    'Hello Hola Meals!,',
    '',
    'I would like to receive launch news, menus and occasional updates.',
    `Name: ${name}`,
    `Email: ${email}`,
    '',
    'I understand that I can unsubscribe at any time. ¡Gracias!'
  ].join('\n');
  window.location.href = `mailto:holamealsutrecht@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

const holidayForm = document.querySelector('#holiday-order-form');
const holidayQuantityInputs = [...document.querySelectorAll('.holiday-qty')];
const holidayCount = document.querySelector('#holiday-count');
const holidayTotal = document.querySelector('#holiday-total');
const holidayError = document.querySelector('#holiday-error');
const holidayPrice = 44.5;

const getHolidayQuantities = () => ({
  beef: Number(document.querySelector('#holiday-beef').value) || 0,
  chicken: Number(document.querySelector('#holiday-chicken').value) || 0,
  vegetarian: Number(document.querySelector('#holiday-vegetarian').value) || 0,
  vegan: Number(document.querySelector('#holiday-vegan').value) || 0
});

const updateHolidayTotal = () => {
  const quantities = getHolidayQuantities();
  const count = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  holidayCount.textContent = String(count);
  holidayTotal.textContent = `€${(count * holidayPrice).toFixed(2)}`;
  holidayError.textContent = count > 0 && count < 2 ? 'The minimum order is two sets.' : '';
};

holidayQuantityInputs.forEach((input) => input.addEventListener('input', updateHolidayTotal));

holidayForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const quantities = getHolidayQuantities();
  const count = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  if (count < 2) {
    holidayError.textContent = 'Please choose at least two Holiday Dinner Sets.';
    return;
  }

  const name = document.querySelector('#holiday-name').value.trim();
  const deliveryDate = document.querySelector('#holiday-date').value;
  const total = `€${(count * holidayPrice).toFixed(2)}`;
  const subject = `Holiday Dinner Set request from ${name} — ${count} sets`;
  const body = [
    'Hello Hola Meals!,', '',
    'I would like to request the following Holiday Dinner Sets:',
    `Beef & Bacon: ${quantities.beef}`,
    `Chicken: ${quantities.chicken}`,
    `Vegetarian: ${quantities.vegetarian}`,
    `Plant-based: ${quantities.vegan}`,
    `Total sets: ${count}`,
    `Estimated total: ${total}`,
    '',
    `Delivery date: ${deliveryDate}`,
    `Name: ${name}`,
    `Email: ${document.querySelector('#holiday-email').value.trim()}`,
    `Phone: ${document.querySelector('#holiday-phone').value.trim()}`,
    `Delivery address: ${document.querySelector('#holiday-address').value.trim()}`,
    `Delivery area: ${document.querySelector('#holiday-area').value}`,
    `Notes: ${document.querySelector('#holiday-notes').value.trim() || 'None'}`,
    `Newsletter signup: ${document.querySelector('#holiday-newsletter').checked ? 'Yes' : 'No'}`,
    '',
    'I understand this is a request and that availability, allergens and payment will be confirmed by Hola Meals!.',
    'I understand that the order deadline is Friday 18 December 2026 at 12 PM (noon).'
  ].join('\n');

  window.location.href = `mailto:holamealsutrecht@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

document.querySelector('#year').textContent = new Date().getFullYear();
