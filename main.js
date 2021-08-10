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
  pager: false,
  controls: true,
  keyboardEnabled: false,
  // oneToOneTouch: false
  touchEnabled: false
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
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано не верное значение в countSectionPosition");
    return 0;
  }

  return position;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = "fixed-menu--shadowed";

  if (menuTheme === 'white') {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items
    .eq(itemEq)
    .addClass(activeClass)
    .siblings()
    .removeClass(activeClass);
}

const performTransition = sectionEq => {
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });

  resetActiveClassForItem(sections, sectionEq, "active")

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
  }, transitionOver + mouseInertiaOver);
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }

  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on('keydown', e => { // стрелки
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName === 'input' || tagName === 'textarea';
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch (e.keyCode) {
    case 38: // prev
      scroller.prev();
      break;

    case 40: //next
      scroller.next();
      break;
  }
});

$('.wrapper').on('touchmove', e => e.preventDefault());


$('[data-scroll-to]').click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index())
});

if (isMobile) {
  // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
  $("body").swipe({
    swipe: function (
      event,
      direction,
    ) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    }
  });
};

let player;
const playerContainer = $('.player');

let eventsInit = () => { // Events
  $(".player__start").on('click', e => {
    e.preventDefault();

    if (playerContainer.hasClass('paused')) {
      playerContainer.removeClass('paused');
      player.pauseVideo();
    } else {
      playerContainer.addClass('paused');
      player.playVideo();
    }
    if (!playerContainer.hasClass('active')) {
      playerContainer.addClass('active');
    }
  });

  $('.player__playback').on('click', e => {
    const bar = $(e.currentTarget);
    const clickedPosition = e.originalEvent.layerX;
    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlayBackPosition = (player.getDuration() / 100) * newButtonPositionPercent;

    if (!playerContainer.hasClass('active')) {
      playerContainer.addClass('active');
    }

    if (!playerContainer.hasClass('paused')) {
      playerContainer.addClass('paused');
      player.playVideo();
    }

    $('.player__playback-button').css('left', `${newButtonPositionPercent}%`);

    player.seekTo(newPlayBackPosition);
    // console.log(e.originalEvent);
    // console.log(buttonPosition);
    console.log(e.currentTarget);

  });

  $('.player__splash').on('click', e => {
    playerContainer.addClass('active');
    if (playerContainer.hasClass('paused')) {
      playerContainer.removeClass('paused');
      player.pauseVideo();
    } else {
      playerContainer.addClass('paused');
      player.playVideo();
    }
    if (!playerContainer.hasClass('active')) {
      playerContainer.addClass('active');
    }
  })
}

const formatTime = timeSec => { // Форматирование времени (добавление нулей)
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  return `${minutes}:${seconds}`;
}

const onPlayerReady = e => { // Интервал обновления и само добавление таймингов
  let interval;
  const durationSec = player.getDuration();
  const time = formatTime(durationSec);

  $('.player__duration-estimate').text(time);

  if (typeof interval !== 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(e => {
    const completedSec = Math.trunc(player.getCurrentTime());
    const completedPercent = (completedSec / durationSec) * 100;

    $('.player__playback-button').css('left', `${completedPercent}%`);

    $('.player__duration-completed').text(formatTime(completedSec));
  }, 1000)
}

function onYouTubeIframeAPIReady() { // Добавление видео
  player = new YT.Player('yt-player', {
    height: '357',
    width: '662',
    videoId: 'nxg4C365LbQ',
    playerVars: {
      'playsinline': 1,
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      'onReady': onPlayerReady,
      // 'onStateChange': onPlayerStateChange
    }
  });
}

eventsInit();

// Карта

let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [53.188653, 50.104845],
    zoom: 13,
    controls: []
  });


  const coords = [
    [53.193787, 50.095994],
    [53.195236, 50.102853],
    [53.197366, 50.097198],
    [53.183973, 50.102324],
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "./icons/map/pinmap.svg",
    iconImageSize: [42, 42],
    iconImageOffset: [-21, -21],
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.behaviors.disable('scrollZoom');
  myMap.geoObjects.add(myCollection);
}
ymaps.ready(init);