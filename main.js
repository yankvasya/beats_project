const body = document.body;
const hamburger = document.querySelector('.hamburger');
const hamburgerAll = document.querySelector('.hamburger__all');
const hamburgerClose = document.querySelector('.hamburger__close');

const fixedMenu = document.querySelector('.fixed-menu__link');

hamburger.addEventListener('click', () => {
  hamburgerAll.style.display = `flex`;
  body.style.overflowY = `hidden`;
});

hamburgerClose.addEventListener('click', () => {
  hamburgerAll.style.display = `none`;
  body.style.overflowY = `scroll`;

});

