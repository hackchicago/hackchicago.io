window.sr = ScrollReveal({
  scale: .8
});

// mobile compatible touch event
const clickEvent = 'ontouchend' in document ? 'touchend' : 'click';

$(document).ready(function() {
  if (getParam("success") !== null && getParam("success") !== "")
    finishSignupFlow();

  let counter = 0;
  $("#bround2").on("click", function() {
    counter++;
    if (counter === 10) window.location.href = 'http://bit.ly/2LiBlne';
  });

  // check referral
  checkRef(Cookies.get('ref'));

  // check times and update page depending on time
  checkTime();

  if (Cookies.get('ap-name') !== undefined) {
    setAPLink(Cookies.get('ap-name'));
  }

  let scrollBottom = $(window).scrollTop() + $(window).height();
});

// define event times
let signupEnd = moment('2018-07-14 23:59');
let hackChicagoStart = moment('2018-07-21 12:00');
let hackChicagoEnd = moment('2018-07-22 12:00');
function checkTime() {
  // get current time
  const now = moment();

  // before event & during signups
  if (now.isBefore(signupEnd)) {
    // setup page
    // check if user has signed up & adjust page accordingly
    // if user has signed up:
    if (Cookies.get('hasSignedUp') !== undefined) {
      // hide registration
      $('#register-section').hide();
      $('.general-signup').hide();
      // suggest ambassador program
      $('#signup-status').show();
      // hide referral code
      $('.refBar').hide();
      // show ambassador program
      $('#ambassador').show();
      // show option to change state of registration
      $('.forceState').html("Haven't registered yet? <a id=\"forceState\" href=\"#!\">Register</a>");
      $('#forceState').on(clickEvent, checkState);
    } else {
      // show signup button
      $('#signup-button-div').show();
      // show option to change state of registration
      $('.forceState').html('Already registered? <a id="forceState">Refer Your Friends</a>!');
      $('#forceState').on(clickEvent, checkState);
    }
  // after signups close
  } else if (now.isBefore(hackChicagoEnd)) {
    // hide registration
    $('#register-section').hide();
    $('.general-signup').hide();
    // show closed signups message
    $('#signup-status').html('Sign ups are now closed.<br />For further inquiries, please <a class="underline" href="mailto:hello@hackchicago.io">email us</a>.').show();
    // hide referral code
    $('.refBar').hide();
    // hide forceState
    $('.forceState').hide();
  // UNCOMMENT THIS LATER - TODO: setup event dashboard (i.e. notifications using browser api)
  /*
  // during event
  } else if (now.isAfter(hackChicagoStart) && now.isBefore(hackChicagoEnd)) {
    // add link to event dashboard (with live notifications)
  */
  // after event
  } else if (now.isAfter(hackChicagoEnd)) {
    // hide registration
    $('#register-section').hide();
    $('.general-signup').hide();
    // change date to thanks for attending message
    $('.date').text('Thanks for attending!');
    // add button to view winners on devpost
    $('#signup-button-div').html('<a href="https://hackchicago18.devpost.com/" target="_blank"><button style="width:160px;height:45px;">View Submissions</button></a>');
    // resize button
    $('#signup-button-div button').css('width', '80%');
    // hide referral code
    $('.refBar').hide();
    // hide forceState
    $('.forceState').hide();
    // hide signup status
    $('#signup-status').hide();
  }
}

function toggleSignup(ref) {
  if (ref)
    window.location = "/apply?ref=" + ref;
  else
    window.location = "/apply";
}

//Get Parameter
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function checkRef(ref) {
  if (ref != null && ref != "" && ref != "null")
    fillRef(ref);
  else {
    Cookies.set('ref', fillRef(getParam("ref")), {
      expires: 180
    })
  }
}

function fillRef(code) {
  if (code != "" && code != null) {
    $('#button-a').attr('href','/apply?ref='+code);
  }

  return code;
}

function finishSignupFlow() {

  $('#button-signup').hide();
  $('.refBar').hide();
  $('#signup-status').show();

  Cookies.set('hasSignedUp', 'true', {
    expires: 180
  });

}

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1200, function() {});
      }
    }
  });

// CLICK EVENTS
// signup button
$('.general-signup').on(clickEvent, function() {
  // on signup button press, scroll page to #register-section (choose between student, mentor, school)
  $('html, body').animate({
    scrollTop: $("#register-section").offset().top - 150
  }, 1800);
});

$('#scrollToAP').on(clickEvent, scrollToAP);

$('.generate').on(clickEvent, function() {
  if ($('.ap-name').val() != "") {
    Cookies.set("ap-name", setAPLink($('.ap-name').val()), {
      expires: 180
    })
  }
});

$('.ap-reset').on(clickEvent, function() {
  resetAP();
});

$('.alt-signup.school').on(clickEvent, function() {
  $('html, body').animate({
    scrollTop: $("#school").offset().top - 100
  }, 1200);
  setTimeout(function() {
    $('#school .highlight-block').effect("highlight", {
      color: 'rgba(82, 153, 211, .8)'
    }, 3000);
  }, 500);
});

$('.alt-signup.mentor').on(clickEvent, function() {
  $('html, body').animate({
    scrollTop: $("#mentor").offset().top - 100
  }, 1200);
  setTimeout(function() {
    $('#mentor .highlight-block').effect("highlight", {
      color: 'rgba(82, 153, 211, .8)'
    }, 3000);
  }, 500);
});

function checkState() {
  if (Cookies.get('hasSignedUp') == undefined) {
    $('#ambassador').show();
    scrollToAP();
    Cookies.set('hasSignedUp', 'true', {
      expires: 180
    });
    $('#register-section').hide();
    $('.general-signup').hide();
    $('#signup-status').show();
    $('.refBar').hide();
    $('.forceState').html("Haven't registered yet? <a id=\"forceState\" href=\"#!\">Register</a>");

    $('#forceState').on(clickEvent, checkState);
  } else {
    Cookies.remove('hasSignedUp');
    window.location.reload(false);
  }
}

function scrollToAP() {
  $('html, body').animate({
    scrollTop: $("#ambassador").offset().top
  }, 2800);
}

function setAPLink(n) {
  $('.ap-form').hide();
  $('.ap-result').html("<span>Your unique link:</span>&ensp;<input class=\"ap-link\" value=\"https://hackchicago.io/?ref=" + n.replace(" ", "+") + "\">");
  $(".ap-link").on("click", function() {
    if (!navigator.clipboard) {
      $(".ap-link").focus();
      $(".ap-link").select();
      try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'Copied!' : 'Press CTRL + C or CMD + C to copy';
        tooltip(msg);
      } catch (err) {
        tooltip('Press CTRL + C or CMD + C to copy');
      }
    } else {
      navigator.clipboard.writeText($('.ap-link').val()).then(function() {
        tooltip('Copied!');
      }, function(err) {
        tooltip('Press CTRL + C or CMD + C to copy');
      });
    }
  });
  $('.ap-link').attr('style', "width: " + $('.ap-link').val().length * 8 + "px");
  $('.ap-link').attr('style', "width: " + $('.ap-link').val().length * 8 + "px");
  $('.ap-name-box').text(n);
  $('.ap-reset-bar').show();
  return n;
}

function tooltip(text) {
  $(".ap-tooltip").text(text);
  $(".ap-tooltip").fadeIn().delay(2000).fadeOut();
}

function resetAP() {
  $('.ap-form').show();
  $('.ap-result').html("");
  $('.ap-reset-bar').hide();
  Cookies.remove("ap-name");
}
sr.reveal('.center', {
  duration: 1500,
  afterReveal: function(domEl) {
    $('#scroll-container').show();
  }
});
sr.reveal('.row-wrapper', {
  scale: 1,
  mobile: false,
  viewFactor: 0.01,
});
sr.reveal('.alt-signup');
sr.reveal('.card');
sr.reveal('.tier');
sr.reveal('.sponsor');
sr.reveal('.partner');
