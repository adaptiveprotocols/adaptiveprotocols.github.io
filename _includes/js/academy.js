$(window).resize(function() {
	var $assetTitle = $('.asset-title'),
			assetWidth  = $assetTitle.width();

	$assetTitle.css('height', assetWidth + 32);
}).resize();

$('select#academy').change(function() {
	var value =  this.value,
      $asset = $('.asset');
	$asset.hide()
    .removeClass('is-showing');
  $('.asset.' + value).show()
    .addClass('is-showing');
  if (value == 'all') {
  	$asset.show()
      .addClass('is-showing');
  }
});
