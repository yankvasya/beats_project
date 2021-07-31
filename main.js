const body = document.body;
const hamburger = document.querySelector('.hamburger');
const hamburgerAll = document.querySelector('.hamburger__all');
const hamburgerClose = document.querySelector('.hamburger__close');

const fixedMenu = document.querySelector('.fixed-menu__link');

hamburger.addEventListener('click', () => {
  e.preventDefault();
  hamburgerAll.style.display = `flex`;
  body.style.overflowY = `hidden`;
});

hamburgerClose.addEventListener('click', e => {
  e.preventDefault();
  hamburgerAll.style.display = `none`;
  body.style.overflowY = `scroll`;
});

$('.member__drop-link').on('click', e => { // Реализация аккордеона
  e.preventDefault();
  let child = $(e.currentTarget).children().eq(2);
  let elem = $(child).prev();

  if ($(child).hasClass('active')) {
    $('.active').slideUp();
    $('.active').removeClass();
    $(elem).css('transform', 'rotate(-180deg)');
  } else {
    $('.member__elem').css('transform', 'rotate(-180deg)');
    $('.active').slideUp();
    $('.active').removeClass();
    $(elem).css('transform', 'rotate(0deg)');
    $(child).slideToggle();
    $(child).addClass('active');
  }

  console.log($(elem));
});


$('.fixed-menu__link').on('click', e => {
  e.preventDefault();
});

$('.button').on('click', e => {
  e.preventDefault();
});

$('.social__link').on('click', e => {
  e.preventDefault();

});


$('.person').on('click', e => {
  e.preventDefault();

});
