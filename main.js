const body = document.body;
const hamburger = document.querySelector('.hamburger');
const hamburgerAll = document.querySelector('.hamburger__all');
const hamburgerClose = document.querySelector('.hamburger__close');
const fixedMenu = document.querySelector('.fixed-menu__link');

hamburger.addEventListener('click', e => { // Выпадашка
  e.preventDefault();
  console.log('123');
  hamburgerAll.style.display = `flex`;
  body.style.overflowY = `hidden`;
});

hamburgerClose.addEventListener('click', e => { // Закрытие выпадашки
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

const form = document.querySelector('.form'); /* форма */

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const fields = [form.elements.name, form.elements.phone, form.elements.street, form.elements.house, form.elements.frame, form.elements.room, form.elements.floor, form.elements.comment]; /* массив полей, обязательных для заполнения */
  const data = { /* объект данных для отправки в запросе */
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    street: form.elements.street.value,
    house: form.elements.house.value,
    frame: form.elements.frame.value,
    room: form.elements.room.value,
    floor: form.elements.floor.value,
    comment: form.elements.comment.value,
    to: 'test@test.com'
  };
  const xhr = new XMLHttpRequest();

  console.log(data);

  let isValid = true; /* флаг, показывающий, прошла ли форма валидацию */
  const modal = $('#modal');
  const contModal = modal.find(".modal__content");
  contModal.text("");



  fields.forEach(field => {
    console.log();
    if (!field.value.length) { /* проверяем только на заполненность, можно добавить различные доп условия */
      isValid = false;
      field.classList.add('error')
    } else {
      field.classList.remove('error')
    }
    if (field.trim === " ") {
      console.log('123');
    }
  })

  if (isValid) {
    $('#modal').removeClass('error-modal');
    console.log('Отправляем запрос');
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    xhr.setRequestHeader('content-type', 'application/json');

    $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: form.elements.name.value,
        phone: form.elements.phone.value,
        comment: form.elements.comment.value,
        to: 'test@test.com'
      },
      success: date => {
        contModal.text(date.message);
        $('#modal').css('display', 'flex');
      },
      error: date => {
        $('#modal').addClass('error-modal');
        contModal.text(date.responseJSON.message);
        $('#modal').css('display', 'flex');
      }
    });

  } else {
    console.log('Не отправляем запрос')
  }
});

$('.button--model').on('click', e => {
  e.preventDefault();

  $('#modal').hide();
});

$(window).on('load', e => {
  $('.bx-wrapper').addClass('container');
});

$('.color__block').on('click', e => {
  const parent = e.currentTarget;
  const children = $(parent).find('.color__info');

  if (!$(children).hasClass('visible')) {
    if ($('.color__info').hasClass('visible')) {
      $('.color__info').removeClass('visible');
    }
    $(children).toggleClass('visible');
  } else {
    console.log('123');
    $('.color__info').removeClass('visible');
  }
});

// OnePageScroll

const sections = $('.sections');
const display = $('.maincontent');

let inScroll = false;

sections.first().addClass("active-section");

const performTransition = sectionEq => {
  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;

    const currentSection = sections.eq(sectionEq);
    const menuTheme = currentSection.attr("data-sidemenu-theme");
    const sideMenu = $(".fixed-menu");

    if (menuTheme === 'white') {
      sideMenu.addClass('fixed-menu--shadowed');
    } else {
      sideMenu.removeClass('fixed-menu--shadowed');
    }


    display.css({
      transform: `translateY(${position}%)`,
    });

    sections.eq(sectionEq).addClass('active-section').siblings().removeClass('active-section');

    setTimeout(() => {
      inScroll = false;

      sideMenu
        .find(".fixed-menu__item")
        .eq(sectionEq)
        .addClass("fixed-menu__item--active")
        .sublings()
        .removeClass("fixed-menu__item--active");
    }, 1300);
  }
};

const scrollViewport = direction => {
  const activeSection = sections.filter(".active-section");
  const nextSection = activeSection.next();
  // console.log(nextSection);
  const prevSection = activeSection.prev();

  if (direction === 'next' && nextSection.length) {
    performTransition(nextSection.index());
  }
  if (direction === 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

$(window).on('keydown', e => {

  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== 'input' && tagName !== 'textarea') {
    console.log('да');
    switch (e.keyCode) {
      case 38: // prev
        scrollViewport('prev');
        break;
      case 40: //next
        scrollViewport('next');

        break;
    }
  }
});


$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index())
})