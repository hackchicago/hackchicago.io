// check URL for referral code
let urlRef = getParam('ref');
if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined) 
  Cookies.set('ref', urlRef, { expires: 180 });

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

$(function() {

    var r = Cookies.get('ref');
    if (r != "" && r != null) {
      $(".apply-link").attr("href", "/apply?ref=" + r);
      $("#ref-name").text(r);
      $("#ref").css("display", "inline");
    }
});