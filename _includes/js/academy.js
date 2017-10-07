$('select#academy').change(function() {
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

$(window).resize(function() {
	var $assetTitle = $('.asset-title'),
			assetWidth  = $assetTitle.width();

	$assetTitle.css('height', assetWidth + 32);
}).resize();
