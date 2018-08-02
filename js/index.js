AOS.init({
  once: true
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  if (getParam('s') || getParam('ref')) {
    $('#ref').addClass('success');
  }
})

// get parameter
function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function unarchive() {
  $("#archive").slideDown();
  $("#copyright").css("background-color", "#f7f9fe");
  $('html, body').animate({
    scrollTop: $("#archive").offset().top
  }, 1000);
  $("#scroll-switch").hide();
}
