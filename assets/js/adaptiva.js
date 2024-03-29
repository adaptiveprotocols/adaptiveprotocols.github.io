---
---
function isTouch() { // check to see if touch screen
  try {
    document.createEvent("TouchEvent");
    return true;
  }
  catch(e) {
    return false;
  }
}

// {% include js/translator.js %}

jQuery(document).ready(function($) { // DOM ready pants

  {% include js/kokkaku/kokkaku.js %}

  {% include js/visible.js %}

  {% include js/smooth-scroll.js %}

  {% include js/scrollto.js %}

	{% include js/newsletter.js %}

});
