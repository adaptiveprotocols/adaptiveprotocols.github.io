jQuery(document).ready(function($) { // academy ready pants

		var $asset = $('.asset'),
				container = $('.academy').find('.grid-container'),
				matched = 0,
				search = $('form.academy-search'),
				searchBar = search.find('input');
				resetAcademy = function() {

					container.find('.asset.is-showing').sort(function(a, b) {
						return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
					});

				};

		$asset.each(function(index){ // immediately loop through all assets

			$(this).attr('data-original-index', index); // create a data attr with its original index

		});

		$('select#academy').change(function() { // user selects category from dropdown

			var value =  this.value, // store category selection
					selection = $(this).find('option:selected').text();

			resetAcademy(); // reset order if user selects from dropdown after searching
			$('.search-info').hide();
			$asset.hide().removeClass('is-showing is-match'); // hide all and remove mod classes
		  $('.asset.' + value).addClass('is-showing').show(); // find assets in selected category and show
		  if (value == 'all') { // if user selects all resources
		  	$asset.show().addClass('is-showing'); // show all
		  }

			searchBar.attr('placeholder', 'Search ' + selection);

		});

		$(window).resize(function() { // keep all tiles square

		  var $assetTitle = $('.asset.is-showing .asset-title'),
					assetWidth  = $assetTitle.width();

			$assetTitle.css('height', assetWidth + 32);

		}).resize();

	search.submit(function(e){ // user searches for string

		e.preventDefault(); // stop page from reloading
		$asset.attr('data-score', ''); // reset search scores
		resetAcademy(); // if assets have been reordered by a prior search, reset them first

		var results = [], // results go here obvs
				scope = $('.asset.is-showing'), // set query scope to only assets currently on page
				query = $('#academySearch').val().toLowerCase(), // user's query
				q = query.split(' '); // split query up by word and add to array; // all assets showing on page at time of query

		scope.each(function() { // loop through all assets on page

			var title = $(this).find('h3').text().toLowerCase(), // title of current asset
					match = false, // no matches by default
					score = 0, // score for result ordering
					bonus = scope.length; // bonus score to be decremented depending on order of

			for (var i = 0; i < q.length; i++) { // loop through query word array

				var reg = new RegExp(q[i], 'g'); // new regex rule to match each word in query

				if (title.match(reg)) { // if current word in query loop matches anything in title
					console.log('Matched word "' + q[i] +'"');
					match = true; // we got a match!
					score += (bonus - i); // give each match a bonus depending on the index of the query of the matched word
					score++; // increment score for each match
				}

				if (match) {
					$(this).attr('data-score', score); // add number of matched words to DOM attribute
					results.push($(this)); // add current $asset object to results array
				}

			}

			match = false; // reset match

		});

		$asset.removeClass('is-showing is-match').hide(); // hide and reset everything

		console.log(results);

		$.each(results, function(){ // loop through results

			$(this).addClass('is-match'); // add mod class for matched assets

		});

		container.find('.asset.is-match').sort(function(a,b) { // sort container based on data-score attr

			return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;

		}).appendTo(container);

		$('.asset.is-match').addClass('is-showing').show(); // show matched assets
		$('.search-info').show(); // show result count and 'clear' button

		matched = results.length;
		$('#resultCount').text(matched + ' results found for "' + query + '"'); // display number of results

		$('.js-clear-search').click(function() { // user clicks "clear search" button

			resetAcademy(); // reorder everything
			$('.search-info').hide(); // hide search info bar
			$asset.removeClass('is-match').addClass('is-showing').show(); // reset mod classes and show everything

		})

	});

});
