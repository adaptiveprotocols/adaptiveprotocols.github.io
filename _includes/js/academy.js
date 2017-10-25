(function(){ // academy pants

	$('select#academy').change(function() {
		var value =  this.value,
	      $asset = $('.asset');
		$asset.hide()
	    .removeClass('is-showing');
	  $('.asset.' + value).addClass('is-showing').show();
	  if (value == 'all') {
	  	$asset.show()
	      .addClass('is-showing');
	  }
	});

	$(window).resize(function() {
	  var $assetTitle = $('.asset.is-showing .asset-title'),
				assetWidth  = $assetTitle.width();

		$assetTitle.css('height', assetWidth + 32);
	}).resize();

})();
