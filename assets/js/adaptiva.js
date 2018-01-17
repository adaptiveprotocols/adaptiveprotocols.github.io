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

function isTouch() { // check to see if touch screen
  try {
    document.createEvent("TouchEvent");
    return true;
  }
  catch(e) {
    return false;
  }
}

{% include js/confirmation.js %}

jQuery(document).ready(function($) { // DOM ready pants

  {% include js/kokkaku/kokkaku.js %}

  {% include js/visible.js %}

  {% include js/smooth-scroll.js %}

  {% include js/scrollto.js %}

});
