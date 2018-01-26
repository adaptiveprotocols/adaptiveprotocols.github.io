jQuery(document).ready(function($) { // academy ready pants

		var $asset = $('.asset');

		$('select#academy').change(function() { // user selects category from dropdown

			var value =  this.value; // store category selection

			$asset.hide().removeClass('is-showing is-match'); // hide all and remove mod classes
		  $('.asset.' + value).addClass('is-showing').show(); // find assets in selected category and show
		  if (value == 'all') { // if user selects all resources
		  	$asset.show().addClass('is-showing'); // show all
		  }

		});

		$(window).resize(function() {

		  var $assetTitle = $('.asset.is-showing .asset-title'),
					assetWidth  = $assetTitle.width();

			$assetTitle.css('height', assetWidth + 32);

		}).resize();

	var search = $('form.academy-search');

	search.submit(function(e){ // user searches for string

		e.preventDefault(); // stop page from reloading

		var results = [];

		$asset.removeClass('is-showing is-match').attr('data-matched', '').hide(); // hide and reset everything

		$('.asset').each(function() { // loop through all assets on page

			var title = $(this).find('h3').text().toLowerCase(), // title of current asset
					match = false, // no matches by default
					matched = 0, // number of words matched from query
					query = $('#academySearch').val().toLowerCase(), // user's query
					q = query.split(' '); // split query up by word and add to array

			for (var i = 0; i < q.length; i++) { // loop through query word array

				var reg = new RegExp(q[i], 'g'); // new regex rule to match each word in query

				if (title.match(reg)) {
					console.log('Matched word "' + q[i] +'"');
					match = true; // we got a match!
					matched++; // increment value for matched words for each match
				}

			}

			if (match) {
				$(this).attr('data-matched', matched); // add number of matched words to DOM attribute
				results.push($(this)); // add current $asset object to results array
			}

			match = false; // reset match

		});

		$.each(results, function(){ // loop through results

			$(this).addClass('is-match'); // add mod class for matched assets

		});

		$('.asset.is-match').addClass('is-showing').show(); // show matched assets

		console.log(results);

	});

});
