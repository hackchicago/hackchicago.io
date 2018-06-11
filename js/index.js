AOS.init({});

// check URL for referral code
let urlRef = getParam('ref');
if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined)
  Cookies.set('ref', urlRef, { expires: 180 });

// check URL for success flag
if (getParam('success') == 'true') Cookies.set('hasSignedUp', 'true', { expires: 180 });

// handle signed up attendee or referral
if(Cookies.get('hasSignedUp') == 'true') {
  $('#apply-button').html('<b>Your application has been submitted!</b>').css('color', '#5299d3');
} else {
  var r = Cookies.get('ref');
  if (r != "" && r != null && r != "null" && r != undefined) {
    $(".apply-link").attr("href", "/apply?ref=" + r);
    $("#ref-name").text(r);
    $("#ref").addClass("show");
  }
}

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
