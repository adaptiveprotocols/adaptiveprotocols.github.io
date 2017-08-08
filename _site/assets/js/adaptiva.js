jQuery(document).ready(function($) { //safety pants!
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

  $('.tertiary-nav-item').click(function(){
  var navID = $(this).attr('id');
  $(this).closest('.tertiary').find('.tertiary-nav-item').removeClass('is-selected');
  $(this).toggleClass('is-selected');
  $(this).closest('.tertiary').find('.tertiary-nav-content').removeClass('is-visible').hide();
  $('.tertiary-nav-content.' + navID).show().addClass('is-visible');
});

  $('.slider-dot').click(function(){
	var $this = $(this);
  var slideID = $this.attr('id');
  $(this).closest('.slider').find('.slider-dot').removeClass('is-selected');
  $this.addClass('is-selected');
  $(this).closest('.slider').find('.slide').removeClass('is-visible').hide();
  $('.slide#' + slideID).addClass('is-visible').show();
});
$('.slider-arrow.prev').click(function(){
	var $this = $(this);
  var slideID = $this.parent('.slide').prev('.slide').attr('id');
  $(this).closest('.slider').find('.slide').removeClass('is-visible').hide();
  $this.parent('.slide').prev('.slide').addClass('is-visible').show();
  $(this).closest('.slider').find('.slider-dot').removeClass('is-selected');
  $('.slider-dot#' + slideID).addClass('is-selected');
});
$('.slider-arrow.next').click(function(){
	var $this = $(this);
  var slideID = $this.parent('.slide').next('.slide').attr('id');
  $(this).closest('.slider').find('.slide').removeClass('is-visible').hide();
  $this.parent('.slide').next('.slide').addClass('is-visible').show();
  $(this).closest('.slider').find('.slider-dot').removeClass('is-selected');
  $('.slider-dot#' + slideID).addClass('is-selected');
});

});
