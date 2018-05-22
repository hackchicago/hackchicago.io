window.sr = ScrollReveal({
  scale: .8
});
$(document).ready(function() {
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

    $(window).resize(function() {
      var divWidth1 = parseFloat($('#tleft').css('width'));
      var divWidth2 = parseFloat($('#bright').css('width'));
      var imgHeight = parseFloat($('#bround1').css('height'));
      $('#tleft').css('width', divWidth1);
      $('#bright').css('width', divWidth2);
      $('#tleft').css('height', imgHeight);
      $('#bright').css('height', imgHeight);
      var imgHeight2 = (imgHeight) / 2;
    });
  }
  let counter = 0;
  $("#bround2").on("click", function() {
    counter++;
    if (counter === 10) window.location.href = 'http://bit.ly/2LiBlne';
  });

  checkRef(Cookies.get('ref'));

  if (Cookies.get('hasSignedUp') !== undefined) {
    $('.general-signup').hide();
    $('#signup-success').show();
    $('.refBar').hide();
    $('#ambassador').show();
    $('#register-section').hide();
    $('.forceState').html("Haven't registered yet? <a id=\"forceState\" href=\"#!\">Register</a>");

    $('#forceState').on('click', checkState);
  }

  if (Cookies.get('ap-name') !== undefined) {
    setAPLink(Cookies.get('ap-name'));
  }

  let scrollBottom = $(window).scrollTop() + $(window).height();
});

$('.general-signup').on('click touchstart', function() {
  $('html, body').animate({
    scrollTop: $("#register-section").offset().top - 150
  }, 1800);
});

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
    $("#referralCode").html("Referred by " + code);
    $("#button-signup").on('click touchstart', function() {
       toggleSignup(code);
    });
  } else {
    $('#button-signup').on('click touchstart', function() {
      $("#troubleshoot").html("Having trouble signing up? <a href=\"mailto:hello@hackchicago.io\">Email us!</a>");
      toggleSignup();
    });
  }

  return code;
}

function finishSignupFlow() {

  $('#signup-frame').attr('src', 'apply.html');
  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');
  $('body').toggleClass('yieldFocus');

  $('#button-signup').hide();
  $('.refBar').hide();
  $('#signup-success').show();

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

$('.splitscreen-close').on('click', function() {
  toggleSignup();
});

$('.generate').on('click', function() {
  if ($('.ap-name').val() != "") {
    Cookies.set("ap-name", setAPLink($('.ap-name').val()), {
      expires: 180
    })
  }
});

$('.ap-reset').on('click touchstart', function() {
  resetAP();
});

// https://stackoverflow.com/a/13106698
jQuery.fn.highlight = function () {
  $(this).each(function () {
    var el = $(this);
    $("<div/>")
      .width(el.outerWidth())
      .height(el.outerHeight())
      .css({
        "position": "absolute",
        "left": el.offset().left,
        "top": el.offset().top,
        "background-color": "#5299d3",
        "opacity": ".7",
        "z-index": "9999999"
      }).appendTo('body').fadeOut(3500).queue(function () { $(this).remove(); });
  });
}

$('#forceState').on('click touchstart', checkState);
$('#scrollToAP').on('click touchstart', scrollToAP);
$('.alt-signup.school').on('click touchstart', function() {
  $('html, body').animate({
    scrollTop: $("#school").offset().top - 100
  }, 1200);
  setTimeout(function() {
    $('#school').highlight();
  }, 500);
});
$('.alt-signup.mentor').on('click touchstart', function() {
  $('html, body').animate({
    scrollTop: $("#mentor").offset().top - 100
  }, 1200);
  setTimeout(function() {
    $('#mentor').highlight();
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
    $('#signup-success').show();
    $('.refBar').hide();
    $('.forceState').html("Haven't registered yet? <a id=\"forceState\" href=\"#!\">Register</a>");

    $('#forceState').on('click', checkState);
  } else {
    Cookies.remove('hasSignedUp');
    window.location.reload(false);
  }
}

function scrollToAP() {
  $('html, body').animate({
    scrollTop: $("#ambassador").offset().top - 60
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
  viewFactor: 0.05,
  distance: "50px",
  mobile: false
});
sr.reveal('.alt-signup');
sr.reveal('.card');
sr.reveal('.tier');
sr.reveal('.sponsor');
sr.reveal('.partner');
