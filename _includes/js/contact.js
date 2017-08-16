var $salesProfile = $('.sales-map-profile'),
    $firstProfile = $('.sales-map-profile:first-child'),
    $lastProfile  = $('.sales-map-profile:last-child');

$('.territory').click(function(){ // user clicks on dot on map
  var salesID = $(this).attr('id'); // store ID attribute for each dot clicked

  $salesProfile.addClass('is-visible'); // add mod class to all profiles

  $('.sales-map-profile#' + salesID) // find profile with same ID as clicked dot
    .addClass('is-current') // add mod class for current item
    .show(); // show profile for clicked dot
});

$('.js-prev').click(function(){ // user clicks previous arrow
  $(this).parent() // find parent (.sales-map-profile)
    .removeClass('is-current') // mod class
    .hide()
    .prev() // Find previous profile
    .show()
    .addClass('is-current'); // mod class
});

// cycles around to last profile if user clicks prev on first slide
$firstProfile.children('.js-prev').click(function(){
  $(this).removeClass('is-current')
    .parent()
    .hide();
  $lastProfile.show()
    .addClass('is-current');
});

// cycles around to first profile if user clicks next on last slide
$lastProfile.children('.js-next').click(function(){
  $(this).removeClass('is-current')
    .parent()
    .hide();
  $firstProfile.show()
    .addClass('is-current');
});

$('.js-next').click(function(){ // user clicks next arrow
  $(this).parent()
    .removeClass('is-current')
    .hide()
    .next()
    .show()
    .addClass('is-current');
});

$('.js-sales-close').click(function(){ // user clicks close button
  $salesProfile
    .hide() // hide, duh?
    .removeClass('is-visible is-current'); // remove all mod classes
});
