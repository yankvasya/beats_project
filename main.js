const hamburger = document.querySelector('.hamburger');
const body = document.body;

const hamburgerAll = document.createElement('div');
hamburgerAll.classList.add('hamburger__all');

const hamburgerClose = document.createElement('a');
hamburgerClose.classList.add('hamburger__close');
hamburgerAll.appendChild(hamburgerClose);
hamburgerClose.innerHTML = `<img src="../icons/hamburger__close.svg">`;

const hamburgerContent = document.createElement('div');
hamburgerAll.appendChild(hamburgerContent);
hamburgerContent.classList.add('hamburger__content');

const hamburgerList = document.createElement('ul');
hamburgerContent.appendChild(hamburgerList);
hamburgerList.classList.add('hamburger__list');

const hamburgerItems = document.createElement('li');
hamburgerList.appendChild(hamburgerItems);
hamburgerItems.classList.add('hamburger__items');


const aboutUs = document.createElement('a');
hamburgerItems.appendChild(aboutUs);
aboutUs.innerText = 'О нас';
aboutUs.classList.add('hamburger__link');

const headphones = document.createElement('a');
hamburgerItems.appendChild(headphones);
headphones.innerText = 'Наушники';
headphones.classList.add('hamburger__link');

const team = document.createElement('a');
hamburgerItems.appendChild(team);
team.innerText = 'Команда';
team.classList.add('hamburger__link');

const price = document.createElement('a');
hamburgerItems.appendChild(price);
price.innerText = 'Цены';
price.classList.add('hamburger__link');

const feedbacks = document.createElement('a');
hamburgerItems.appendChild(feedbacks);
feedbacks.innerText = 'Отзывы';
feedbacks.classList.add('hamburger__link');

const howWork = document.createElement('a');
hamburgerItems.appendChild(howWork);
howWork.innerText = 'Как мы работаем';
howWork.classList.add('hamburger__link');

const contacts = document.createElement('a');
hamburgerItems.appendChild(contacts);
contacts.innerText = 'Контакты';
contacts.classList.add('hamburger__link');







// hamburger.classList.add('')

hamburger.addEventListener('click', () => {
  body.appendChild(hamburgerAll);
});

hamburgerClose.addEventListener('click', () => {
  hamburgerAll.remove();
});

