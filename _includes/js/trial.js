(function(){ // free trial pants

  var container = '.js-trial-container';

  function closeTrial() {

    $(container).fadeOut(300, function(){
      $(this).removeAttr('style').css({
        'display': 'none'
      });
    });

    $('html,body').css({
      'overflow': ''
    }).off('touchmove');

  }

  $('.js-trial').click(function(){ // user clicks free trial button

    $(container).fadeIn(300); // fade in modal

    // Disable scrolling while trial container is open
    $('html,body')
      .css({
        'overflow': 'hidden'
      }).on('touchmove', function(e){
        e.preventDefault();
      });

    $(document).keydown(function(e){ // user hits key while modal open

      switch(e.which) {

        case 27: closeTrial(); // ESC: close modal
        break;

        default: return;

      }
      e.preventDefault(); // stop from scrolling or anything weird

    });

  });

  $('.js-trial-close').click(closeTrial); // User clicks X to close

  if ( isTouch() == true ) { // check for touch device

    $(container).swipe({ // user swipes trial container

      swipeStatus: function(event, phase, direction, distance) {

        if (direction=='down') { // user swipes down

          if (phase=='move') { // while swipe is in motion

            $(this)
              .css({
                'opacity': 1 - ((distance/2)/100), // fade as user swipes
                'top': distance/2 + '%' // slide downward with swipe
              });

          }

          if (phase=='end') { // user completes swipe

            closeTrial();

          }

          if (phase=='cancel') {

            $(this).removeAttr('style').css({
              'display': 'flex'
            });

          }

        }

      },
      triggerOnTouchEnd: false,
      triggerOnTouchLeave: false,
      threshold: 200,
      cancelThreshold: 42

    });

  }

})();
