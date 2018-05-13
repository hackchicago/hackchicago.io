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

});

function success() {
  $('#fail').css('display', 'none');
  $('.signup').css('borderColor', '#5299D3');
  $('#emails').css('color', '#5299D3');
  $('#signupbutton').css('color', '#5299D3');
  $('#signupbutton').css('borderColor', '#5299D3');
  $('.signup').html('<p class="succ">Success!</p>');
  $('.signup').css('width', '140px');
}

function failure() {
  $('#fail').css('display', 'block');
  $('.signup').css('borderColor', '#EA442B');
  $('#emails').css('color', '#EA442B');
  $('#signupbutton').css('color', '#EA442B');
  $('#signupbutton').css('borderColor', '#EA442B');
  $('#signupbutton').css('backgroundColor', 'transparent');
  $('.signup').effect("shake", {times:3, distance:60}, 500);
}

function toggleSignup() {

  $('#signup-frame').attr('src', 'apply.html');
  $('.splitscreen').toggleClass('show');
  $('.split-overlay').toggleClass('show');
  $('body').toggleClass('noscroll');

}