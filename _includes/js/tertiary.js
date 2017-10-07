$('.tertiary-nav-item').click(function(){ // user clicks on tertiary nav item
  var $this = $(this),
      navID = $this.attr('id');
  $this.parent().children() // localize
    .removeClass('is-selected'); // remove mod class from all
  $this.toggleClass('is-selected'); // toggle mod class on clicked item
  $this.closest('.tertiary')
    .find('.tertiary-nav-content') // select tertiary content
    .removeClass('is-visible') // remove mod class
    .hide(); // hide all
  $('.tertiary-nav-content#' + navID) // find content that matches clicked element
    .show() // show it
    .addClass('is-visible'); // add mod class
  $this.parent() // select parent ul element
    .scrollTo('.is-selected', 600); // scroll to clicked element, animated 600ms
});
