---
---

jQuery(document).ready(function($) { //safety pants!
  {% include js/visible.js %}
  {% include js/smooth-scroll.js %}
  {% include js/scrollto.js %}
  {% include js/nav.js %}
  {% include js/tertiary.js %}
  {% include js/slider.js %}
  {% include js/about.js %}
  {% include js/contact.js %}
  {% include js/academy.js %}
  {% include js/products.js %}

  // one-off stuff
  // Free trial button
  $('.js-trial').click(function(){ // user clicks free trial button
    $('.js-trial-container').fadeIn(300); // fade in lightbox
  });

  $('.js-trial-close').click(function(){ // user clicks X
    $('.js-trial-container').fadeOut(300); // fade out lightbox
  });
});

(function() { // more safety pants!
  if ('serviceWorker' in navigator) {
    console.log('CLIENT: service worker registration in progress.');
    navigator.serviceWorker.register('/service-worker.js').then(function() {
      console.log('CLIENT: service worker registration complete.');
    }, function() {
      console.log('CLIENT: service worker registration failure.');
    });
  } else {
    console.log('CLIENT: service worker is not supported.');
  }
})();
