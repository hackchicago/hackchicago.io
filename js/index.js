AOS.init({});

// check URL for referral code
let urlRef = getParam('ref');
if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined)
  Cookies.set('ref', urlRef, { expires: 180 });

// check URL for success flag
if (getParam('success') == 'true') Cookies.set('hasSignedUp', 'true', { expires: 180 });

// handle signed up attendee or referral
if(Cookies.get('hasSignedUp') == 'true') {
  $('#tagline').html('<b>Your application has been submitted 🎉 🎉 <br/> Look out for an email receipt within 15 minutes!</b>');
  $('#tagline').addClass('success');
  $('#apply-button').hide();
} else {
  $("#ref").addClass("show");
  const now = Date.now();
  const appsClose = Date.parse('13 Jul 2018 17:00:00 PST');
  const hoursRemaining = Math.round(Math.abs(appsClose - now) / 36e5);
  $('#timeUntilClose').text(`in ${hoursRemaining === 0 ? 'less than an hour' : `${hoursRemaining} hour${hoursRemaining !== 1 ? 's' : ''}`}`);
  /*const r = Cookies.get('ref');
  if (r != "" && r != null && r != "null" && r != undefined) {
    $("#ref-name").text(r);
    $("#ref").addClass("show");
  }*/
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
})

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