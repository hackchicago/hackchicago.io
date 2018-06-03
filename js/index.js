// scroll up to top of page on <a href="#top">
$('a[href="#top"]').click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
