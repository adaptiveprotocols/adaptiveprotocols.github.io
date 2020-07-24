---
---
jQuery(document).ready(function($) {
    {% include js/dictionaries/product-dictionary.js %}
    $('#brochure').addClass('active');
    $('.product-feature-item').click(function(){

      var $this     = $(this),
          featureID = $this.attr('id'); // store ID attribute in featureID variable

      $this
        .parent().children() // localize
        .removeClass('is-selected'); // clear mod class from all items

      $this.addClass('is-selected'); // add mod class to clicked element

      $this.closest('.slide') // localize
        .find('.product-features-video') // find videos
        .hide() // hide all videos
        .removeClass('is-visible'); // clear mod classes

      $('.product-features-video#' + featureID) // select video with matching ID
        .addClass('is-visible') // add mod class
        .show(); // show only selected video

    });
});
