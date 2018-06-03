$(document).ready(function() {
  // check URL for referral code
  let urlRef = getParam('ref');
  if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined) Cookies.set('ref', urlRef, { expires: 180 });
}

// scroll up to top of page on <a href="#top">
$('a[href="#top"]').click(function() {
  $("html, body").animate({ scrollTop: 0 }, "slow");
  return false;
});
