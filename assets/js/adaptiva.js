---
---

jQuery(document).ready(function($) { //safety pants!

  {% include js/smooth-scroll.js %}
  {% include js/nav.js %}
  {% include js/tertiary.js %}
  {% include js/slider.js %}
  // Load more button on awards table ----------
  $('.js-awards').click(function(){
    $('.js-awards-row:nth-child(n+6)').toggleClass('is-showing');
    $(this).text(function(i, text){
          return text === "Show More" ? "Show Less" : "Show More";
      });
  });
  {% include js/contact.js %}
});
