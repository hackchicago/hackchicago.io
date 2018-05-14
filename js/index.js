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

  // load different messages depending on time
  loadText();
});

function loadText() {
  const signupEnd = moment('2018-06-14 0:00')
  const hackChicagoStart = moment('2018-06-21 12:00')
  const hackChicagoEnd = moment('2018-06-22 12:00')

  const now = moment()

  if (now.isBefore(signupEnd)) {
    // before event & during signups
    $('.date').html('July 21<sup>st</sup> to 22<sup>nd</sup>');
    $('#signup_div').html('<button class="signup" onclick="toggleSignup()">Sign Up</button>');
  } else if (now.isBefore(hackChicagoEnd)) {
    // after signups close
    $('.date').html('July 21<sup>st</sup> to 22<sup>nd</sup>');
    $('#signup_div').html('<button style="width:160px;" class="signup" disabled>Sign Ups Closed</button>');
  } else if (now.isAfter(hackChicagoEnd)) {
    // after event
    $('#signup_div').html('<a href="https://hackchicago.devpost.com" target="_blank"><button style="width:160px;" class="signup">View winners</button></a>');
    $('.date').text('Thanks for attending!');
  }
}

function toggleSignup(ref) {

  if (ref)
    $('#signup-frame').attr('src', 'apply.html?ref=' + ref);
  else
    $('#signup-frame').attr('src', 'apply.html');

  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');
  $('body').toggleClass('yieldFocus');

}

$('.yieldFocus').click(function(){
  $('#signup-frame').focus();
});

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
    $(".signup").attr('onclick', 'toggleSignup("'+ code +'")')
  }

  return code;
}

function finishSignupFlow() {

  $('#signup-frame').attr('src', 'apply.html');
  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');
  $('body').toggleClass('yieldFocus');

  $('.signup').hide();
  $('#signup-success').show();

}
