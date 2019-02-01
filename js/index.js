AOS.init({
  once: true
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip();

  if (getParam('s') || getParam('ref')) {
    $('#ref').addClass('success');
  }

  vex.dialog.alert({
    unsafeMessage: `
      <div>
        <a href="https://hackcincinnati.io"><img src="img/hackathons/hackcincinnati.svg" style="border-radius: 0"></a>
      </div>
    `
  })
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