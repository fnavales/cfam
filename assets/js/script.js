$(document).ready(function() {
  "use strict";
  // Scroll to top
  $("a[href='#top']").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  // Smooth scroll
  $('a.scroll-to').on('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 700);
    event.preventDefault();
  });

  $('.site-testimonial-item').on('mouseenter', function(){
    $('.site-testimonial-item').addClass('inactive');
    $(this).removeClass('inactive').addClass('active');
  });
  $('.site-testimonial-item').on('mouseleave', function(){
    $('.site-testimonial-item').removeClass('inactive');
    $('.site-testimonial-item').removeClass('active');
  });

  // Star Wars Navbar Search Toggle
  $('#swSearchBtn').on('click', function(e) {
    e.preventDefault();
    $('#swSearchDropdown').slideToggle(200, function() {
      if ($(this).is(':visible')) {
        $('#swSearchInput').focus();
      }
    });
  });

  $('#swSearchClose').on('click', function() {
    $('#swSearchDropdown').slideUp(200);
  });

  // Handle Enter on Search
  $('#swSearchInput, #mobileSearchInput').on('keypress', function(e) {
    if (e.which === 13) {
      var query = $(this).val().trim();
      if (query.length > 0) {
        window.location.href = '/portfolio?search=' + encodeURIComponent(query);
      }
    }
  });

  // Close search on Esc key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') {
      $('#swSearchDropdown').slideUp(200);
    }
  });

  // Highlight active nav link
  var currentPath = window.location.pathname;
  $('.starwars-link').each(function() {
    var href = $(this).attr('href');
    if (href === currentPath || (href !== '/' && currentPath.indexOf(href) === 0)) {
      $(this).addClass('active');
    }
  });

});

$(window).on('scroll', function () {
  var windscroll = $(window).scrollTop();
  if (windscroll >= 50) {
    $('.site-navigation').addClass('nav-scrolled');
  } else {
    $('.site-navigation').removeClass('nav-scrolled');
  }
});