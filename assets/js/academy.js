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
		sortRel = function() {
			// sort by score
			container.find('.asset').sort(function(a, b) {
				return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
			}).appendTo(container);

		},
		sortDate = function() {
			// sort by date/original index
			container.find('.asset').sort(function(a, b) { // sort by original index
				return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
			}).appendTo(container);

		},
		resetAcademy = function(sort = true, show = false, hide = false) {
			// optional
			if (sort) {
				sortDate();
			}
			if (show) {
				asset.removeClass('is-match').addClass('is-showing').show();
			}
			if (hide) {
				asset.removeClass('is-showing is-match').hide();
			}
			// default
			asset.attr('data-score', '0'); // reset scores
			searchBtn.removeClass('is-active'); // gray out search button
			sortBy.removeClass('is-selected');
			$('#sortRel').addClass('is-selected'); // reset sortby buttons

		},
		showScope = function() {
			// indicate scope in search bar placeholder text
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

		// if user selects all resources
		if (category == 'all') {

			asset.show().addClass('is-showing'); // show all

		}
		// specify scope in searchbar
		showScope();

	});

	/* TILE SIZING */

	$(window).resize(function() {
		// keep tiles square at all times
		var assetTitle = $('.asset.is-showing .asset-title'),
			assetWidth = assetTitle.width();

		assetTitle.css('height', assetWidth + 32);

	}).resize();

	/* ACADEMY SEARCH */

	search.submit(function(e) { // user submits query :o

		var results = [], // results go here obvs
			// set scope to assets currently on page
			scope = $('.asset.is-showing'),
			// user query (case insensitive)
			query = $('#academySearch').val().toLowerCase(),
			// split query by word and store in array
			q = query.split(' '),
			tags = tagContainer.find('span.search-tags-tag');

		/* DEFAULT SUBMIT ACTIONS */

		e.preventDefault(); // stop page from reloading

		// hide all assets and reset scores
		resetAcademy(null, null, hide = true);

		// ensure search button activates if user starts typing again
		if (searchBar.is(':focus')) {

			searchBar.on('input', function(e) {
				searchBtn.addClass('is-active');
			});

		}

		/* FIND RESULTS */

		scope.each(function() { // loop through current scope

			var bonus = scope.length, // bonus score based on number of available results
				match = false, // no matches by default
				score = 0, // score for result ordering
				title = $(this).attr('title').toLowerCase(); // title of current asset


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

		// show search info and actions
		searchInfo.show().addClass('is-showing');

		/* SEARCH TAGS */

		// display number of results
		$('#resultCount').text(results.length + ' results found for "' + query + '"');

		// add tags to container
		if (tagContainer.text().length == 0) { // if target container is empty

			// add first tag
			tagContainer.append('<span class="search-tags-tag is-active">' + query + '</span>');

		} else { // other tags already exist

			tags.removeClass('is-active');
			// add subsequent tag
			tagContainer.append('<span class="search-tags-tag is-active is-sub">' + query + '</span>');

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

			$.each(session[index], function() { // loop through corresponding result in session

				$(this).addClass('is-match'); // mark as matches again

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

	}); // end submit function

	/* CLEAR BUTTON */

	$('.js-clear-search').click(function() { // user clicks "clear search" button

		session = []; // empty search history

		// reset dropdown and search bar
		dropdown.val('all');
		searchInfo.hide().removeClass('is-showing');
		searchBar.val('');
		tagContainer.empty();
		showScope();
		resetAcademy(sort = true, show = true);

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
