(function(){ // safety pants

  var $salesProfile = $('.sales-map-profile');

  // Next Profile

  function prevProfile() {

    var $currentProfile = $('.sales-map-profile.is-current');

    if ( $currentProfile.is(':first-child') ) { // if current profile is first
      $currentProfile
        .removeClass('is-current prev next') // remove mod classes from current
        .hide() // hide current
        $('.sales-map-profile:last-child') // cycle around to last profile
          .show() // show last profile
          .addClass('is-current prev') // add mod classes
    } else {
        $currentProfile
          .removeClass('is-current prev next') // remove mod classes from current
          .hide() // hide current
          .prev() // select previous profile
            .show() // show previous
            .addClass('is-current prev') // add mod classes to previous
    }
  }

  function nextProfile() {

    var $currentProfile = $('.sales-map-profile.is-current');

    if ( $currentProfile.is(':last-child') ) { // if current profile is last
      $currentProfile
        .removeClass('is-current prev next') // remove mod classes from current
        .hide() // hide current
        $('.sales-map-profile:first-child') // cycle around to first profile
          .show() // show last profile
          .addClass('is-current next') // add mod classes
    } else {
        $currentProfile
          .removeClass('is-current prev next') // remove mod classes from current
          .hide() // hide current
          .next() // select next profile
            .show() // show previous
            .addClass('is-current next') // add mod classes to previous
    }
  }

  function closeProfile() {

    $salesProfile.hide() // hide any visible profiles
      .removeClass('is-visible is-current next prev'); // remove all mod classes

    $('html,body')
      .css('overflow', '')
      .unbind('touchmove');

    return false;
  }

  $('.territory').click(function(){ // user clicks on dot on map

    var salesID = $(this).attr('id'); // store ID attribute for each dot clicked

    $salesProfile.addClass('is-visible'); // add mod class to all profiles

    $('.sales-map-profile#' + salesID) // find profile with same ID as clicked dot
      .addClass('is-current') // add mod class for current item
      .show(); // show profile for clicked dot

    $('html,body')
      .css('overflow','hidden') // disable scrolling
      .bind('touchmove', function(e){
        e.preventDefault(); // prevent default behavior on touch devices
      });

    console.log('User clicked profile for ' + salesID); // log activity to console
  });


  $('.js-prev').click(prevProfile); // previous arrow triggers previous profile

  $('.js-next').click(nextProfile); // next arrow triggers next profile

  $('.js-sales-close').click(closeProfile); // close profile when user clicks X

  // Swipe Gestures

  $salesProfile.swipe({

    swipeRight: function() { // user swipes right <3
      prevProfile(); // trigger previous
    },
    swipeLeft: function() { // user swipes left </3
      nextProfile(); // trigger next
    },
    swipeDown: function() { // user swipes down
      closeProfile(); // close
    },
    threshold: 68 // minimum swipe distance of 68px
  });

})(); // end safety pants
