jQuery(document).ready(function($) { // academy ready pants

	// variables
	var asset = $('.asset'),
		container = $('.academy').find('.grid-container'),
		dropdown = $('select#academy'),
		search = $('form.academy-search'),
		searchBtn = $('.academy-search-button'),
		searchBar = $('.academy-search-bar'),
		searchInfo = $('.search-info'),
		session = [], // store user search path
		sortBy = $('.academy-sort'),
		tagContainer = $('#searchTags'),
		// function expressions
		sortRel = function() { // sort by score

			container.find('.asset').sort(function(a, b) {
				return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
			}).appendTo(container);

		},
		sortDate = function() {

			container.find('.asset').sort(function(a, b) { // sort by original index
				return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
			}).appendTo(container);

		},
		resetAcademy = function(sort = true, show = false, hide = false) {

			if (sort) {
				sortDate();
			}

			if (show) {
				asset.removeClass('is-match').addClass('is-showing').show();
			}

			if (hide) {
				asset.removeClass('is-showing is-match').hide();
			}

			asset.attr('data-score', '0'); // reset search scores every time
			searchBtn.removeClass('is-active'); // gray out button every time
			sortBy.removeClass('is-selected');
			$('#sortRel').addClass('is-selected');

		},
		showScope = function() {

			var searchScope = dropdown.find('option:selected').text();
			searchBar.attr('placeholder', 'Search ' + searchScope);

		},
		showMatched = function() {

			$('.asset.is-match').addClass('is-showing').show();

		};

	/* CATEGORY SELECTION */

	dropdown.change(function() { // user selects category from dropdown

		var category = this.value, // store category selection
			selection = $(this).find('option:selected').text(); // text value for selection

		// if prior search reorder and hide search stuff
		resetAcademy(sort = true, null, hide = true);
		searchInfo.hide().removeClass('is-showing');
		searchBar.val('');
		tagContainer.empty();

		// find assets in selected category and show
		$('.asset.' + category).addClass('is-showing').show();

		if (category == 'all') { // if user selects all resources

			asset.show().addClass('is-showing'); // show all

		}
		// specify scope in searchbar
		showScope();

	});

	/* TILE SIZING */

	$(window).resize(function() {

		var assetTitle = $('.asset.is-showing .asset-title'),
			assetWidth = assetTitle.width();

		assetTitle.css('height', assetWidth + 32); // keep tiles square at all times

	}).resize();

	/* ACADEMY SEARCH */

	search.submit(function(e) { // user submits query :O

		e.preventDefault(); // stop page from reloading

		var results = [], // results go here obvs
			scope = $('.asset.is-showing'), // set scope to only assets currently on page
			query = $('#academySearch').val().toLowerCase(), // user query (case insensitive)
			q = query.split(' '), // split query up by word and add to array
			tags = tagContainer.find('span.search-tags-tag');

		resetAcademy(null, null, hide = true); // hide all assets and reset scores

		/* FIND RESULTS */

		scope.each(function() { // loop through all assets on page

			var title = $(this).attr('title').toLowerCase(), // title of current asset
				match = false, // no matches by default
				score = 0, // score for result ordering
				bonus = scope.length; // bonus score based on number of available results

			for (var i = 0; i < q.length; i++) { // loop through query words

				var reg = new RegExp(q[i], 'g'); // match each word in query

				if (title.match(reg)) { // if current word in q finds match in title
					console.log('Matched word "' + q[i] + '"');
					match = true; // we got a match!
					if (title === query) {
						score += bonus * 2; // if exact match, give double full bonus
					}
					score += (bonus - i); // give each match a bonus based on word order
					score *= 2; // double score for each match
				}

			} // end q loop

			if (match) {

				$(this).attr('data-score', score); // add score to DOM attribute
				results.push($(this)); // add current asset to results

			}

			match = false; // reset match

		}); // end scope loop

		/* DISPLAY RESULTS */

		session.push(results); // add latest search to session

		// log results and session history
		console.log(results);
		console.log(session);

		$.each(results, function() { // mark results as matches

			$(this).addClass('is-match');

		}); // end results loop

		showMatched(); // show results
		sortRel(); // sort results based on score

		/* SEARCH TAGS */

		// show result count and 'clear' button
		searchInfo.show().addClass('is-showing');

		// display number of results
		$('#resultCount').text(results.length + ' results found for "' + query + '"');

		// add tags to container
		if (tagContainer.text().length == 0) { // if target container is empty

			// add first tag
			tagContainer.append('<span class=\"search-tags-tag is-active\">' + query + '</span>');

		} else { // other tags already exist

			$('.search-tags-tag').removeClass('is-active');
			// add subsequent tag
			tagContainer.append('<span class=\"search-tags-tag is-active is-sub\">' + query + '</span>');

		}

		// add title attributes for nice hover cues
		tags.each(function() {

			$(this).attr('title', 'Revert search scope back to "' + $(this).text() + '"');

		});

		// tag clicks
		tags.not('.is-active').click(function() {

			var index = tags.index($(this)),
				queryTxt = $(this).text();

			// set only clicked tag to active
			tags.removeClass('is-active');
			$(this).addClass('is-active');

			// reset everything
			resetAcademy(sort = true, show = true);

			// display updated number of results
			$('#resultCount').text(session[index].length + ' results found for "' + queryTxt + '"');

			$(this).nextAll().remove(); // remove everything after clicked tag
			session.length = index + 1; // revert session history

			$.each(session[index], function() { // loop through session array at same index as tag clicked

				$(this).addClass('is-match'); // add mod classes

			});

			console.log(session); // log new session history
			showMatched(); // show results for current query
			searchBar.focus();

		});

		/* SORT RESULTS BY DATE/RELEVANCE */

		$('#sortDate').click(sortDate);
		$('#sortRel').click(sortRel);

		sortBy.click(function(e) {

			e.preventDefault();

			if (!$(this).hasClass('is-selected')) {

				sortBy.removeClass('is-selected');
				$(this).addClass('is-selected');

			} else {
				// don't do anything if already selected
				return false;

			}

		});

		// ensure search button activates if user starts typing again
		if (searchBar.is(':focus')) {

			searchBar.on('input', function(e) {
				searchBtn.addClass('is-active');
			});

		}

	}); // end submit function

	/* CLEAR BUTTON */

	$('.js-clear-search').click(function() { // user clicks "clear search" button

		session = []; // empty search history
		searchInfo.hide().removeClass('is-showing'); // hide search info bar

		// reset dropdown and search bar
		tagContainer.empty(); // remove all search tags
		dropdown.val('all');
		searchBar.val('');
		showScope();
		resetAcademy(sort = true, show = true); // reorder everything

	});

	/* SEARCH BUTTON */

	searchBar
		.focus(function() { // active button when user focuses on search bar
			searchBtn.addClass('is-active');
		})
		.focusout(function() { // deactivate if user leaves search bar
			searchBtn.removeClass('is-active');
		});

});
