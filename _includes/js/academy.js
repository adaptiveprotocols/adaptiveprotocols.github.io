$('select#sccm-academy').change(function() {
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
