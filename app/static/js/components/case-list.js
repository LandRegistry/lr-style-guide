$(function() {

  $('.case-list .summary td:first-child').wrapInner('<a href="#"></a>');

  $('.case-list').on('click', '.summary', function(e) {
    e.preventDefault();
    $(this).next().toggleClass('js-hidden');
  });
});