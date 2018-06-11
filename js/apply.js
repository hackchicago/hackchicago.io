var ref;
var conversationalForm

window.onload = function() {
  // save form data
  $("#signup").sisyphus();

  // disable autocomplete completely
  $("input, select, textarea").on("focus click", function() {
    $(this).attr("autocomplete", "new-" + Math.random().toString(36).replace(/[^a-z]+/g, ''));
  });

  // check referral
  checkRef();

  // check if user has signed up already
  if(Cookies.get('hasSignedUp') == 'true')
    $('.already-signed-up').show();
  else
    $('.container').show();
};

function checkRef() {
  let urlRef = getParam('ref');
  if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined) Cookies.set('ref', urlRef, { expires: 180 });
  let cookieRef = Cookies.get('ref');
  if (cookieRef != null && cookieRef != "" && cookieRef != "null" && cookieRef != undefined) {
    $("#ref-fill").html('<label class="desc">Referred by '+ cookieRef +'</span><br/><input type="hidden" name="REF" id="refcode">');
    $("#refcode").val(cookieRef);
  } else {
    $("#ref-fill").html('<label for="refcode">Who did you hear about Hack Chicago from? <span class="desc">First and last name</span></label><input type="text" id="REF" name="REF" cf-questions="Just by chance, who told you about Hack Chicago? Simply reply with their full name.<br />If you were not referred by anyone, simply reply “no”."/>');
  }
}

function reSignup() {
  $('.already-signed-up').hide();
  $('.container').show();
  Cookies.remove('hasSignedUp');
}

// check email confirmation + phone number when user leaves field
$('#email').blur(function() { checkEmail(); });
$('#email-confirm').blur(function() { checkEmail(); });
$('#phone').blur(function() { checkPhone(); });

function checkEmail() {
  // check for email confirmation
  if(!($('#email').val() === $('#email-confirm').val()) && $('#email').val() !== '' && $('#email-confirm').val() !== '') {
    // handle emails not being equal
    $('#email').addClass('invalid');
    $('#email-confirm').addClass('invalid');
    return false;
  } else {
    $('#email').removeClass('invalid');
    $('#email-confirm').removeClass('invalid');
    return true;
  }
}

function checkPhone() {
  // check for phone
  var re = new RegExp('^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$');
  if(!re.exec($('#phone').val()) && $('#phone').val() !== '') {
    // handle invalid phone
    $('#phone').addClass('invalid');
    return false;
  } else {
    $('#phone').removeClass('invalid');
    return true;
  }
}

function validateForm() {
  if (!checkEmail() || !checkPhone()) {
    $('#submitApplication').text('Invalid responses');
    location.href = '#email';
    return false;
  } else {
    return true;
  }
}

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
