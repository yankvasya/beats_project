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
    $('.member__drop').removeClass('active');
    $(elem).css('transform', 'rotate(0deg)');
  } else {
    $('.member__elem').css('transform', 'rotate(0deg)');
    $('.active').slideUp();
    $('.active').removeClass('active');
    $(child).addClass('active');
    $(elem).css('transform', 'rotate(-180deg)');
    $(child).slideToggle();
  }

  console.log($(elem));
});

$('#rightbtn').on('click', e => {
  e.preventDefault();
});

$('#leftbtn').on('click', e => {
  e.preventDefault();
})

$('.fixed-menu__link').on('click', e => {
  e.preventDefault();
});

$('.button').on('click', e => {
  e.preventDefault();
});

$('.social__link').on('click', e => {
  e.preventDefault();

});


const findBlockByAlias = alias => {
  return $('.feedback').filter((ndx, item) => {
    return $(item).attr('data-feedback') === alias;
  });
};

$('.person').on('click', e => {
  e.preventDefault();

  const target = $(e.currentTarget);
  const data = target.attr('data-pos');

  const itemToShow = findBlockByAlias(data);
  $('.person').removeClass('person--active');
  $(target).addClass('person--active');

  itemToShow.addClass('feedback--active').siblings().removeClass('feedback--active');
});

$('.slider').bxSlider({
  controls: 'false',
  keyboardEnabled: 'true'
});

$('.form').submit(e => {
  e.preventDefault();
  console.log('123');

  $.fancybox.open({
    src: "#modal",
    type: "inline"
  })
});
