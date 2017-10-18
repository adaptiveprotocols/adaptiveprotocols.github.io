var $salesProfile = $('.sales-map-profile'),
    $firstProfile = $('.sales-map-profile:first-child'),
    $lastProfile  = $('.sales-map-profile:last-child');

$('.territory').click(function(e){ // user clicks on dot on map
  e.preventDefault();
  var salesID = $(this).attr('id'); // store ID attribute for each dot clicked

  $salesProfile.addClass('is-visible'); // add mod class to all profiles

  $('.sales-map-profile#' + salesID) // find profile with same ID as clicked dot
    .addClass('is-current') // add mod class for current item
    .show(); // show profile for clicked dot
  $('html,body').css('overflow','hidden');
  console.log('User clicked profile for ' + salesID);
});

function prevProfile() {
  $(this).parent() // find parent (.sales-map-profile)
    .removeClass('is-current next prev') // remove mod classes
    .hide()
    .prev() // Find previous profile
    .show()
    .addClass('is-current prev'); // mod class
}

function nextProfile() {
  $(this).parent() // find parent
    .removeClass('is-current next prev') // remove mod classes
    .hide()
    .next() // find next profile
    .show()
    .addClass('is-current next'); // add mod class
}

function firstProfile() {
  $(this).removeClass('is-current next prev') // remove mod classes
    .parent()
    .hide(); // hide profile
  $lastProfile.show() // cycle around to last profile
    .addClass('is-current prev'); // add mod class
}

function lastProfile() {
  $(this).removeClass('is-current next prev') // remove mod class
    .parent()
    .hide(); // hide profile
  $firstProfile.show() // cycle around to first profile
    .addClass('is-current next'); // add mod class
}

function closeProfile() {
  $salesProfile.hide()
    .removeClass('is-visible is-current next prev');
  $('html,body').css('overflow', '');
}

$('.js-prev').click(prevProfile); // previous arrow triggers previous profile

$('.js-next').click(nextProfile); // next arrow triggers next profile

// cycles around to last profile if user clicks prev on first slide
$firstProfile.children('.js-prev').click(firstProfile);

// cycles around to first profile if user clicks next on last slide
$lastProfile.children('.js-next').click(lastProfile);

$('.js-sales-close').click(closeProfile);

$salesProfile.swipe({ // user swipes sales profile
  swipeRight:function() { // user swipes right <3
    if ( $(this).is(':first-child') ) { // if first profile
      $(this).children('.js-prev')
        .each(firstProfile); // cycle around to last profile
    } else {
      $(this).children('.js-prev')
        .each(prevProfile); // else trigger previous profile
    }
  },
  swipeLeft:function() { // user swipes left </3
    if ( $(this).is(':last-child') ) { // if last profile
      $(this).children('.js-next')
        .each(lastProfile); // cycle around to first profile
    } else {
      $(this).children('.js-next')
        .each(nextProfile); // else trigger next profile
    }
  },
  swipeDown:function() {
    $salesProfile
      .hide() // hide
      .removeClass('is-visible is-current next prev'); // remove all mod classes
  },
  threshold:178 // user must swipe at least 178px across
});
