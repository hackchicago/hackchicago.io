// check URL for referral code
let urlRef = getParam('ref');
if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined)
  Cookies.set('ref', urlRef, { expires: 180 });

// check URL for success flag
if (getParam('success') == 'true') Cookies.set('hasSignedUp', 'true', { expires: 180 });

// handle signed up attendee or referral
if(Cookies.get('hasSignedUp') == 'true') {
  $('#tagline').html('<b>Your application has been submitted! 🎉 🎉 <br/>Be sure to join our <a href="https://www.facebook.com/groups/hackchicago/">Facebook group</a> and get bonus swag with our <a href="#referral-program">Referral program</a>.</b>');
  $('#apply-button').hide();
} else {
  var r = Cookies.get('ref');
  if (r != "" && r != null && r != "null" && r != undefined) {
    $("#ref-name").text(r);
    $("#ref").addClass("show");
  }
}

if(!(Cookies.get('travelBanner') == 'closed')) $('#travel-banner').show();

function closeTravelBanner() {
  $('#travel-banner').hide();
  Cookies.set('travelBanner', 'closed', { expires: 180 });
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

function showTravelUpdate() {
  swal('Travel info',
  "Hey Midwest Hackers!\n\nIf at least 15 people from your city sign up for Hack Chicago, you'll receive a free bus ride to and from Hack Chicago.\n\nPlease let us know if you have any questions!", 
  {
    button: 'Ok!',
  });
}

function signup() {
  swal("I am applying as a", {
    buttons: {
      mentor: {
        text: "Mentor",
        value: "mentor",
      },
      student: {
        text: "Student",
        value: "student",
      }
    },
  })
  .then((value) => {
    switch (value) {
      case "student":
        window.location.href = '/apply';
        break;
      case "mentor":
        window.open('https://docs.google.com/forms/u/1/d/e/1FAIpQLSeMttIViw27TTfxzT12yKEYeHdjb7gn7WC2M1TGwrY3UlaGkQ/viewform', '_blank');
        break;
    }
  });
}
