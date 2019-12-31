$(document).ready(function() {

  'use strict';

  // =====================
  // Members subscription
  // =====================

  // Parse the URL parameter
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  // Give the parameter a variable name
  var action = getParameterByName('action');
  var stripe = getParameterByName('stripe');

  $(document).ready(function () {
      if (action == 'subscribe') {
        $('body').addClass('subscribe-success');
      }

      if (action == 'signup') {
        window.location = '/signup/?action=checkout';
      }

      if (action == 'checkout') {
        $('body').addClass('signup-success');
      }

      if (action == 'signin') {
        $('body').addClass('signin-success');
      }

      if (stripe == 'success') {
        $('body').addClass('checkout-success');
      }

      $('.c-notification__close').click(function () {
        var uri = window.location.toString();

        $(this).parent().addClass('closed');

        if (uri.indexOf('?') > 0) {
          var clean_uri = uri.substring(0, uri.indexOf('?'));
          window.history.replaceState({}, document.title, clean_uri);
        }
      });
  });

  // =====================
  // Koenig Gallery
  // =====================
  var gallery_images = document.querySelectorAll('.kg-gallery-image img');

  gallery_images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  // =====================
  // Responsive layout
  // =====================

  // Init Masonry
  var $masonry_grid = $('.js-grid').masonry({
    itemSelector: '.js-grid__col',
    percentPosition: true
  });

  // Layout Masonry after each image loads
  $masonry_grid.imagesLoaded().progress(function() {
    $masonry_grid.masonry('layout');
  });

  // =====================
  // Responsive videos
  // =====================

  $('.o-wrapper').fitVids({
    'customSelector': [ 'iframe[src*="ted.com"]'          ,
                        'iframe[src*="player.twitch.tv"]' ,
                        'iframe[src*="dailymotion.com"]'  ,
                        'iframe[src*="facebook.com"]'
                      ]
  });

  // =====================
  // Off Canvas menu
  // =====================

  $('.js-off-canvas-toggle').click(function(e) {
    e.preventDefault();
    $('.js-off-canvas-content, .js-off-canvas-container').toggleClass('is-active');
  });

  $('.js-off-canvas-container__close').click(function(e) {
    e.preventDefault();
    $('.js-off-canvas-content, .js-off-canvas-container').toggleClass('is-active');
  });

  // =====================
  // Post Card Images Fade
  // =====================

  $('.js-fadein').viewportChecker({
    classToAdd: 'is-inview', // Class to add to the elements when they are visible
    offset: 100,
    removeClassAfterAnimation: true
  });

  // =====================
  // Search
  // =====================

  var search_field = $('.js-search-input'),
      search_results = $('.js-search-results'),
      toggle_search = $('.js-search-toggle'),
      search_result_template = "\
      <a href={{link}} class='c-search-result'>\
        <div class='c-search-result__content'>\
          <h3 class='c-search-result__title'>{{title}}</h3>\
          <time class='c-search-result__date'>{{pubDate}}</time>\
        </div>\
        <div class='c-search-result__media'>\
          <div class='c-search-result__image is-inview' style='background-image: url({{featureImage}})'></div>\
        </div>\
      </a>";

  toggle_search.click(function(e) {
    e.preventDefault();
    $('.js-search').addClass('is-active');

    // If off-canvas is active, just disable it
    $('.js-off-canvas-container').removeClass('is-active');

    // Trigger touchstart for Mobile
    search_field.trigger('touchstart');

    setTimeout(function() {
      search_field.focus();
    }, 500);
  });

  // Focus and open keyboard for iPhone Mobile Safari
  // https://stackoverflow.com/a/31043514/558777

  search_field.on('touchstart', function() {
    $(this).focus();
  });

  $('.c-search, .js-search-close, .js-search-close .icon').on('click keyup', function(event) {
    if (event.target == this || event.target.className == 'js-search-close' || event.target.className == 'icon' || event.keyCode == 27) {
      $('.c-search').removeClass('is-active');
    }
  });

  search_field.ghostHunter({
    results: search_results,
    onKeyUp         : true,
    result_template : search_result_template,
    zeroResultsInfo : false,
    displaySearchInfo: false,
    before: function() {
      search_results.fadeIn();
    }
  });

});