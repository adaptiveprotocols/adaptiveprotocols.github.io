jQuery(document).ready(function($) { //safety pants!
  (function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {

      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;

    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };

})(jQuery);

$(window).scroll(function(event) {

  $('.js-scroll').each(function(i, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('is-scrolled');
    }
  });

});

  $('a[href*="#"]') // Select all links with hashes
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top-68
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  $(window).scroll(function(){
  var scroll = $(window).scrollTop();
  var $nav = $('.navbar');
  var navHeight = $nav.height();
  if (scroll >= navHeight) {
    $nav.addClass('is-scrolled');
  } else {
    $nav.removeClass('is-scrolled');
  }
});
$('.js-nav-trigger').click(function(){
  $(this).toggleClass('is-clicked');
  $('nav.nav').toggleClass('is-visible');
});

  $('.tertiary-nav-item').click(function(){
  var navID = $(this).attr('id');
  $(this).closest('.tertiary').find('.tertiary-nav-item').removeClass('is-selected');
  $(this).toggleClass('is-selected');
  $(this).closest('.tertiary').find('.tertiary-nav-content').removeClass('is-visible').hide();
  $('.tertiary-nav-content#' + navID).show().addClass('is-visible');
});

  var $firstSlide = $('.slide:first-child'),
		$lastSlide  = $('.slide:last-child');

$('.slider-dot').click(function(){ // user clicks on nav dots on slider

	var dotID = $(this).attr('id');

	$(this).closest('.slider') // localize
		.find('.slider-dot')
		.removeClass('is-selected'); // remove mod class

	$(this).addClass('is-selected'); // add mod class

	$(this).closest('.slider') // localize
		.find('.slide')
		.removeClass('is-visible') // remove mod class from all slides
		.hide(); // bye!

	$('.slide#' + dotID) // target slide with same ID as clicked dot
		.addClass('is-visible') // add mod class
		.show(); // hi!
});

$('.slider-arrow.prev').click(function(){ // user clicks 'previous' arrow

	var prevID = $(this).parent('.slide').prev('.slide').attr('id');

	$(this).closest('.slider') // localize
		.find('.slide')
		.removeClass('is-visible') // remove mod class
		.hide(); // hide all slides

	$(this).parent('.slide') // localize
		.prev() // find previous slide
		.addClass('is-visible') // add mod class to previous
		.show(); // show previous

	$(this).closest('.slider').find('.slider-dot') // localize and find dots
		.removeClass('is-selected'); // remove mod class from all dots
	$('.slider-dot#' + prevID) // target dot with same ID as current slide
		.addClass('is-selected'); // add mod class
});

$firstSlide.children('.slider-arrow.prev').click(function(){ // user clicks previous on first slide

	$(this).parent() // localize
		.removeClass('is-visible') // remove mod class
		.hide(); // bye!

	$(this).closest('.slider').find('.slide:last-child') // find last slide in parent
		.show() // hi!
		.addClass('is-visible'); // add mod class

	$(this).closest('.slider') // localize
		.find('.slider-dot:last-child') // find last slider dot
		.addClass('is-selected'); // add modd class
});

$('.slider-arrow.next').click(function(){ // user clicks 'next' arrow

	var nextID = $(this).parent('.slide').next('.slide').attr('id');

	$(this).closest('.slider') // same functionality as previous, just backwards, duh
		.find('.slide')
		.removeClass('is-visible')
		.hide();

	 $(this).parent('.slide')
		.next()
		.addClass('is-visible')
		.show();

	 $(this).closest('.slider').find('.slider-dot')
		.removeClass('is-selected');

	 $('.slider-dot#' + nextID)
		.addClass('is-selected');
});

$lastSlide.children('.slider-arrow.next').click(function(){

	$(this).parent()
		.removeClass('is-visible')
		.hide();

	$(this).closest('.slider').find('.slide:first-child')
		.show()
		.addClass('is-visible');

	$(this).closest('.slider')
		.find('.slider-dot:first-child')
		.addClass('is-selected');
});

  // Load more button on awards table ----------
  $('.js-awards').click(function(){
    $('.js-awards-row:nth-child(n+6)').toggleClass('is-showing');
    $(this).text(function(i, text){
          return text === "Show More" ? "Show Less" : "Show More";
      });
  });
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

  $('select#sccm-academy').change(function() {
	var value = this.value;
	$('.asset').hide()
    .removeClass('is-showing');
  $('.asset.' + value).show()
    .addClass('is-showing');
  if (value == 'all') {
  	$('.asset').show()
      .addClass('is-showing');
  }
});

});
