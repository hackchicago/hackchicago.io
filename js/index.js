// check URL for referral code
let urlRef = getParam('ref');
if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined) Cookies.set('ref', urlRef, { expires: 180 });

// get URL params
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$('#sponsor-carousel').on('slid.bs.carousel', function () {
    $(".carousel-item.active:nth-child(" + ($(".carousel-inner .carousel-item").length -1) + ") + .carousel-item").insertBefore($(".carousel-item:first-child"));
    $(".carousel-item.active:last-child").insertBefore($(".carousel-item:first-child"));
});

$(function() {
    $('#referral-modal').modal();
});