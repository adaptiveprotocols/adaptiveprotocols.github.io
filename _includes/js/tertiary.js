$(function() { // safety pants
  $('.tertiary-nav-item a').click(function(event){ // user clicks on tertiary nav item
    event.preventDefault();
    var $this = $(this),
        contentID = $this.attr('href');
    $this.closest('ul').children() // localize
      .removeClass('is-selected'); // remove mod class from all
    $this.parent().toggleClass('is-selected'); // toggle mod class on clicked item
    $this.closest('.tertiary')
      .find('.tertiary-nav-content') // select tertiary content
      .removeClass('is-visible') // remove mod class
      .hide(); // hide all
    $('.tertiary-nav-content' + contentID) // find content that matches clicked element
      .show() // show it
      .addClass('is-visible'); // add mod class
    $this.parent() // select parent ul element
      .scrollTo('.is-selected', 600); // scroll to clicked element, animated 600ms
  });
  var hash = $.trim( window.location.hash );
  if (hash) {
    $('.tertiary-nav-item a[href$="'+hash+'"]').trigger('click');
    $('html, body')
      .animate({scrollTop:$(window.location.hash)
        .offset().top - 288 }, 0);
  }
});
