$(document).ready(function() {
  let animating = false;
  let cardsCounter = parseInt(localStorage.getItem('cardsCounter')) || 0;
  const { numOfCards } = window;
  const decisionVal = 80;
  let pullDeltaX = 0;
  let deg = 0;
  let $card;
  let $cardReject;
  let $cardLike;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css('transform', `translateX(${pullDeltaX}px) rotate(${deg}deg)`);

    const opacity = pullDeltaX / 100;
    const rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
    const likeOpacity = opacity <= 0 ? 0 : opacity;
    $cardReject.css('opacity', rejectOpacity);
    $cardLike.css('opacity', likeOpacity);
  }

  function release() {
    if (pullDeltaX >= decisionVal) {
      $card.addClass('to-right');
    } else if (pullDeltaX <= -decisionVal) {
      $card.addClass('to-left');
    }

    if (Math.abs(pullDeltaX) >= decisionVal) {
      $card.addClass('inactive');

      setTimeout(function() {
        $card.addClass('below').removeClass('inactive to-left to-right');
        cardsCounter += 1;
        if (cardsCounter === numOfCards) {
          // cardsCounter = 0;
          $('.demo__card').removeClass('below');
        }
      }, 300);
    }

    if (Math.abs(pullDeltaX) < decisionVal) {
      $card.addClass('reset');
    }

    setTimeout(function() {
      $card
        .attr('style', '')
        .removeClass('reset')
        .find('.demo__card__choice')
        .attr('style', '');

      pullDeltaX = 0;
      animating = false;
    }, 300);
  }

  $(document).on('mousedown touchstart', '.demo__card:not(.inactive)', function(
    e
  ) {
    if (animating) return;

    $card = $(this);
    $cardReject = $('.demo__card__choice.m--reject', $card);
    $cardLike = $('.demo__card__choice.m--like', $card);
    const startX = e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on('mousemove touchmove', function(e) {
      const x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = x - startX;
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on('mouseup touchend', function() {
      $(document).off('mousemove touchmove mouseup touchend');
      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    });
  });
});

// toggle

$(document).ready(function($) {
  $('.bulb').on('click', function() {
    if (
      !$(this)
        .parent()
        .hasClass('bulb-dark')
    ) {
      $(this)
        .parent()
        .addClass('bulb-dark');
      $('.demo__card').addClass('demo__card__dark__mode');
      $('.image').css('opacity', '0.5');
      $('.author , a').css('color', '#667984');
      $('h5').css('color', '#fff');
      $('p').css('color', '#fff');
    } else {
      $(this)
        .parent()
        .removeClass('bulb-dark');
      $('.demo__card').removeClass('demo__card__dark__mode');
      $('.image').css('opacity', '1');
      $('.author , a').css('color', 'gray');
      $('h5').css('color', '#000000');
      $('p').css('color', '#000000');
    }
  });
});
