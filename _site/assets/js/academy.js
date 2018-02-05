jQuery(document).ready(function($) { // academy ready pants

	var
		asset = $('.asset'),
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
			asset.attr('data-score', '0');
			searchBtn.removeClass('is-active');
			sortBy.removeClass('is-selected');
			$('#sortRel').addClass('is-selected');

		},
		sortDate = function() {
			// sort by date/original index
			container.find('.asset').sort(function(a, b) {
				return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
			}).appendTo(container);

		},
		sortRel = function() {
			// sort by score
			container.find('.asset').sort(function(a, b) {
				return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;
			}).appendTo(container);

		},
		showMatched = function() {

			$('.asset.is-match').addClass('is-showing').show();

		},
		showScope = function() {
			// indicate scope in search bar placeholder text
			searchBar.attr('placeholder', 'Search ' + dropdown.find('option:selected').text());

		};

	/* CATEGORY SELECTION */

	dropdown.change(function() { // user selects category from dropdown

		var
			category = this.value,
			selection = $(this).find('option:selected').text();

		// run resets in case of prior search
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
		var assetTitle = $('.asset.is-showing .asset-title');
		assetTitle.css('height', assetTitle.width() + 32);

	}).resize();

	/* ACADEMY SEARCH */

	search.submit(function(e) { // user submits query :o

		var
			// user query (case insensitive)
			query = $('#academySearch').val().toLowerCase(),
			// split query by word and store in array
			q = query.split(' '),
			// results go here obvs
			results = [],
			// set scope to assets currently on page
			scope = $('.asset.is-showing'),
			tags = tagContainer.find('span.search-tags-tag');

		/* DEFAULT SUBMIT ACTIONS */

		e.preventDefault(); // stop page from reloading

		// hide all assets and reset scores
		resetAcademy(null, null, hide = true);

		// specify narrowed scope in search placehoder
		if (session.length > 0) {
			// give generic scope message after second query
			searchBar.val('').attr('placeholder', 'Search within previous results');

		} else {
			// give specific scope message after first query
			searchBar.val('').attr('placeholder', 'Search within results for "' + query + '"');

		}

		// ensure search button activates if user starts typing again
		if (searchBar.is(':focus')) {

			searchBar.on('input', function() {
				if (searchBar.val().length > 0) {
					searchBtn.addClass('is-active');
				}
			});

			searchBtn
				.on('mouseenter', function() {
					if (searchBar.val().length > 0) {
						searchBtn.addClass('is-active');
					}
				})
				.on('mouseleave', function() {
					searchBtn.removeClass('is-active');
				});

		}

		/* FIND RESULTS */

		scope.each(function() { // loop through current scope

			var
				// bonus score based on number of available results
				bonus = scope.length,
				// no matches by default
				match = false,
				// score for result ordering
				score = 0,
				// title of current asset
				title = $(this).attr('title').toLowerCase();

			for (var i = 0; i < q.length; i++) { // loop through query words

				var reg = new RegExp(q[i], 'g'); // match each word in query

				if (title.match(reg)) { // if current word in q finds match in title
					match = true; // we got a match!
					console.log('Matched word "' + q[i] + '"');
					score += (bonus - i); // give each match a bonus based on word order
					if (title === query) {
						score += bonus * 2; // if exact match, give 2x full bonus
					}
					score *= 2; // double score for each matched word
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

		// mark results as matches
		$.each(results, function() {
			$(this).addClass('is-match');
		});

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

			var index = tags.index($(this));

			// set only clicked tag to active
			tags.removeClass('is-active');
			$(this).addClass('is-active');

			// reset everything
			resetAcademy(sort = true, show = true);

			// display updated number of results
			$('#resultCount').text(session[index].length + ' results found for "' + $(this).text() + '"');

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

		sortBy.click(function(e) {

			e.preventDefault();
			var clicked = $(this);

			if (clicked.hasClass('is-selected')) {
				// do nothing if already selected
				return false;
			} else {
				// set only clicked button to selected state
				sortBy.removeClass('is-selected');
				clicked.addClass('is-selected');
				// run desired sort function
				if (clicked.is('#sortDate')) {
					sortDate();
				} else if (clicked.is('#sortRel')) {
					sortRel();
				}
			}

		});

	}); // end submit function

	/* CLEAR BUTTON */

	$('.js-clear-search').click(function() {
		// empty search history
		session = [];
		// reset dropdown and search bar
		dropdown.val('all');
		searchInfo.hide().removeClass('is-showing');
		searchBar.val('');
		tagContainer.empty();
		showScope();
		resetAcademy(sort = true, show = true);

	});

	/* SEARCH BUTTON */

	searchBar.focus(function() {
		// only light up button if searchbar is focused and has contents
		searchBar.on('input', function() {
			if (searchBar.val().length > 0) {
				searchBtn.addClass('is-active');
			} else {
				searchBtn.removeClass('is-active');
			}
		});

	});

	searchBtn.click(function(e) {
		// prevent submissions if search bar is empty
		if (searchBar.val().length === 0) {
			e.preventDefault();
		}

	});

});
