jQuery(document).ready(function($) { // academy ready pants

  // variables
  var $asset = $('.asset'),
    dropdown = $('select#academy'),
    container = $('.academy').find('.grid-container'),
    session = [], // store user search path
    search = $('form.academy-search'),
    searchBar = search.find('input'),
    tagContainer = $('#searchTags'),
    // function expressions
    hideAssets = function() {

      $asset.removeClass('is-showing is-match').hide();

    },
    resetAcademy = function(show = false) { // reorder by og index and allow DOM reset too

      container.find('.asset.is-showing').sort(function(a, b) { // sort by original index
        return ($(b).data('original-index')) < ($(a).data('original-index')) ? 1 : -1;
      });

      if (show) {
        $asset.removeClass('is-match').addClass('is-showing').show();
      }

    },
    showScope = function() {

      var searchScope = dropdown.find('option:selected').text();
      searchBar.attr('placeholder', 'Search ' + searchScope);

    },
    showMatched = function() {

      $('.asset.is-match').addClass('is-showing').show();

    };

  // immediately loop through all assets
  $asset.each(function(index) {

    $(this).attr('data-original-index', index); // create data attr with original index

  });

  // CATEGORY SELECTION

  dropdown.change(function() { // user selects category from dropdown

    var category = this.value, // store category selection
      selection = $(this).find('option:selected').text(); // text value for selection

    // if prior search reorder and hide search stuff
    resetAcademy();
    $('.search-info').hide();

    hideAssets(); // hide all and remove mod classes

    // find assets in selected category and show
    $('.asset.' + category).addClass('is-showing').show();

    if (category == 'all') { // if user selects all resources

      $asset.show().addClass('is-showing'); // show all

    }

    // specify scope in searchbar
    showScope();

  });

  // TILE SIZING

  $(window).resize(function() {

    var $assetTitle = $('.asset.is-showing .asset-title'),
      assetWidth = $assetTitle.width();

    $assetTitle.css('height', assetWidth + 32); // keep tiles square at all times

  }).resize();

  // ACADEMY SEARCH

  search.submit(function(e) { // user submits query :O

    e.preventDefault(); // stop page from reloading

    var results = [], // results go here obvs
      scope = $('.asset.is-showing'), // set scope to only assets currently on page
      query = $('#academySearch').val().toLowerCase(), // user query (case insensitive)
      q = query.split(' '), // split query up by word and add to array
      tags = tagContainer.find('span.search-tags-tag');

    $asset.attr('data-score', '0'); // reset search scores
    resetAcademy(); // reorder by original index just in case prior search reordered already

    scope.each(function() { // loop through all assets on page

      var title = $(this).find('h3').text().toLowerCase(), // title of current asset
        match = false, // no matches by default
        score = 0, // score for result ordering
        bonus = scope.length; // bonus score based on number of available results

      for (var i = 0; i < q.length; i++) { // loop through query word array

        var reg = new RegExp(q[i], 'g'); // match each word in query

        if (title.match(reg)) { // if current word in query matches anything in title
          console.log('Matched word "' + q[i] + '"');
          match = true; // we got a match!
          score += (bonus - i); // give each match a bonus depending on word order
          score++; // increment score for each match
        }

      } // end q loop

      if (match) {

        $(this).attr('data-score', score); // add score to DOM attribute
        results.push($(this)); // add current asset to results

      }

      match = false; // reset match

    }); // end scope loop

    // DISPLAY RESULTS

    session.push(results); // add search to session

    // log results and session history
    console.log(results);
    console.log(session);

    hideAssets(); // reset before loop

    // loop through results
    $.each(results, function() {

      $(this).addClass('is-match'); // add mod class for matched assets

    }); // end loop

    // sort container based on data-score attr
    container.find('.asset.is-match').sort(function(a, b) {

      return ($(b).data('score')) > ($(a).data('score')) ? 1 : -1;

    }).appendTo(container); // add to container

    showMatched(); // show results

    // SEARCH INFO

    $('.search-info').show(); // show result count and 'clear' button

    // display number of results
    $('#resultCount').text(results.length + ' results found for "' + query + '"');

    // add breadcrumbs to container
    if (tagContainer.text().length == 0) { // if target container is empty

      // add first tag
      tagContainer.append('<span class=\"search-tags-tag is-active\">' + query + '</span>');

    } else { // other tags already exist

      $('.search-tags-tag').removeClass('is-active');
      // add subsequent tag
      tagContainer.append('<span class=\"search-tags-tag is-active is-sub\">' + query + '</span>');

    }

    // add title attributes for hover cues
    tags.each(function() {

      $(this).attr('title', 'Revert search scope back to "' + $(this).text() + '"');

    });

    // breadcrumb clicks
    tags.not('.is-active').click(function() {

      var index = tags.index($(this)),
        queryTxt = $(this).text();

      // set only clicked tag to active
      tags.removeClass('is-active');
      $(this).addClass('is-active');

      if (index !== tags.length) { // as long as it's not the last tag

        // reset everything
        resetAcademy(show = true);

        // display updated number of results
        $('#resultCount').text(session[index].length + ' results found for "' + queryTxt + '"');

        $(this).nextAll().remove(); // remove everything after clicked tag
        session.length = index + 1; // revert session history

        $.each(session[index], function() { // loop through session array at same index as tag clicked

          $(this).addClass('is-match'); // add mod classes

        });

        console.log(session); // log new session history
        showMatched(); // show results for current query

      }

    });

    // clear form button
    $('.js-clear-search').click(function() { // user clicks "clear search" button

      $('.search-info').hide(); // hide search info bar
      tagContainer.empty(); // remove all search tags
      session = []; // empty search history
      resetAcademy(show = true); // reorder everything
      // reset dropdown and search bar
      dropdown.val('all');
      searchBar.val('');
      showScope();

    });

  });

});
