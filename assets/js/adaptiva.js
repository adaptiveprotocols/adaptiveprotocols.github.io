---
---

(function() { // service worker pants

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
  {% include js/secret.js %} // lmfao
})();

// Newsletter and blog confirmation
{% include js/confirmation.js %}

function isTouch() { // check to see if touch screen
  try {
    document.createEvent("TouchEvent");
    return true;
  }
  catch(e) {
    return false;
  }
}

jQuery(document).ready(function($) { // DOM ready pants

  {% include js/kokkaku/kokkaku.js %}

  {% include js/visible.js %}

  {% include js/smooth-scroll.js %}

  {% include js/scrollto.js %}

  {% include js/about.js %}

  {% include js/contact.js %}

  {% include js/academy.js %}

  {% include js/products.js %}

});
