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

});

function success() {
  $('.signup').css('borderColor', '#5299D3');
  $('#emails').css('color', '#5299D3');
  $('#signupbutton').css('color', '#5299D3');
  $('#signupbutton').css('borderColor', '#5299D3');
  $('.signup').html('<p class="succ">Success!</p>');
  $('.signup').css('width', '140px');
}

function failure() {
  $('.signup').css('borderColor', '#EA442B');
  $('#emails').css('color', '#EA442B');
  $('#signupbutton').css('color', '#EA442B');
  $('#signupbutton').css('borderColor', '#EA442B');
  $('#signupbutton').css('backgroundColor', 'transparent');
  $('.signup').effect("shake", {times:3, distance:60}, 500);
}
