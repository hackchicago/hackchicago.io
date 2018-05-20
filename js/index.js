window.sr = ScrollReveal({
  viewFactor: 0.08,
  scale: .8
});
$(document).ready( function() {
  var clientHeight = $(window).height();
  $('#parallax').css('height', clientHeight);
  $('.backrow').css('height', clientHeight);
  $('.middlerow').css('height', clientHeight);
  $('.frontrow').css('height', clientHeight);
  /*$('.bottom').css('margin-top', clientHeight);*/

  /*$(window).resize(function() {
    clientHeight = $(window).height();
    $('#parallax').css('height', clientHeight);
    $('.backrow').css('height', clientHeight);
    $('.middlerow').css('height', clientHeight);
    $('.frontrow').css('height', clientHeight);
    console.log(clientHeight);
  });*/

  var clientWidth = $(window).width();
  console.log(clientWidth);

  if (clientWidth >= 880) {
    var divWidth1 = parseFloat($('#tleft').css('width'));
    var divWidth2 = parseFloat($('#bright').css('width'));
    var imgHeight = parseFloat($('#bround1').css('height'));
    $('#tleft').css('width', divWidth1);
    $('#bright').css('width', divWidth2);
    $('#tleft').css('height', imgHeight);
    $('#bright').css('height', imgHeight);
    var imgHeight2 = (imgHeight) / 2;
    $('#spic1').css('top', imgHeight2);
    $('#spic2').css('top', imgHeight2);

    $(window).resize(function() {
      var divWidth1 = parseFloat($('#tleft').css('width'));
      var divWidth2 = parseFloat($('#bright').css('width'));
      var imgHeight = parseFloat($('#bround1').css('height'));
      $('#tleft').css('width', divWidth1);
      $('#bright').css('width', divWidth2);
      $('#tleft').css('height', imgHeight);
      $('#bright').css('height', imgHeight);
      var imgHeight2 = (imgHeight) / 2;
      $('#spic1').css('top', imgHeight2);
      $('#spic2').css('top', imgHeight2);
    });
  }

  checkRef(Cookies.get('ref'));

  if(Cookies.get('hasSignedUp') !== undefined) {
    $('#signup').hide();
    $('#signup-success').show();
  } else {
    $('#button-signup').html('<button class="button" id="signup">Sign Up</button>');
    $('#signup').on('click touchstart', function() {
      $("#referralCode").html("Having trouble signing up? <a href=\"mailto:hello@hackchicago.io\">Email us!</a>");
      toggleSignup();
    });
  }
  // attach function to mentor button
  $('#mentor').on('click touchstart', function() {
    startMentorSignup();
  });
});

function toggleSignup(ref) {
  if (ref) // load apply form with referral
  $('#signup-frame').attr('src', 'apply.html?ref=' + ref);
  else // load apply form
  $('#signup-frame').attr('src', 'apply.html');

  // show/hide signup widget
  toggleSignupWidget();
}

function startMentorSignup() {
  // load mentor form
  $('#signup-frame').attr('src', 'mentor.html');
  toggleSignupWidget();
}

function toggleSignupWidget() {
  // show/hide signup widget
  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');
  $('body').toggleClass('yieldFocus');
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
    Cookies.set('ref', fillRef(getParam("ref")), { expires: 180 })
  }
}

function fillRef(code) {

  if (code != "" && code != null) {
    $("#referralCode").html("Referred by " + code);
    $("#signup").on('click touchstart', 'toggleSignup("'+ code +'")')
  }

  return code;
}

function finishSignupFlow(isAttendee) {
  if (!isAttendee) {
    $('#signup-frame').attr('src', 'mentor.html');
    toggleSignupWidget();
  } else {
    console.log('is attendee');
    $('#signup-frame').attr('src', 'apply.html');
    Cookies.set('hasSignedUp', 'true', { expires: 180 });
    toggleSignupWidget();
    $('#signup').hide();
    $('#signup-success').show();
  }
}

$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
    &&
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

$('.splitscreen-close').on('click', function() {
  toggleSignupWidget();
});

sr.reveal('.center', {
  duration: 1500,
  afterReveal: function (domEl) {
    $('#scroll-container').show();
  }
});
sr.reveal('.card');
sr.reveal('.sponsor');
sr.reveal('.partner');
