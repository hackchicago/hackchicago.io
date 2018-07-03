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
  if(Cookies.get('hasSignedUp') == 'true') {
    $('.already-signed-up').show();
  } else {
    $('.container').show();
  }
  AOS.init({});
};

function checkRef() {
  let urlRef = getParam('ref');
  if (urlRef != null && urlRef !== "" && urlRef !== "null" && urlRef != undefined) Cookies.set('ref', urlRef, { expires: 180 });
  let cookieRef = Cookies.get('ref');
  if (cookieRef != null && cookieRef != "" && cookieRef != "null" && cookieRef != undefined) {
    $("#ref-fill").html('<label class="desc" style="text-align: center;">Referred by '+ cookieRef +' 🙂</span><br/><input type="hidden" name="REF" id="refcode">');
    $("#refcode").val(cookieRef);
  } else {
    $("#ref-fill").html('<label for="refcode">Who did you hear about Hack Chicago from? <span class="desc">First and last name</span></label><input type="text" id="REF" name="REF" cf-questions="Just by chance, who told you about Hack Chicago? Simply reply with their full name.<br />If you were not referred by anyone, simply reply “no”."/>');
  }
}

// clear hasSignedUp cookie & show form
function reSignup() {
  $('.already-signed-up').hide();
  $('.container').show();
  Cookies.remove('hasSignedUp');
}

// check email confirmation + phone number when user leaves field
$('#email').blur(function() { checkEmail(); });
$('#email-confirm').blur(function() { checkEmail(); });
$('#phone').blur(function() { checkPhone(); });
$('#GRADE').on('change', function() { checkGrade(); });
$('#STATE').blur(function() { checkState(); });

function checkEmail() {
  // set email to lowercase
  $('#email').val($('#email').val().toLowerCase());
  $('#email-confirm').val($('#email-confirm').val().toLowerCase());
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

function checkGrade() {
  if($('#GRADE').val() == '' || $('#GRADE').val() == null) {
    // handle invalid grade
    $('#GRADE').addClass('invalid');
    return false;
  } else {
    $('#GRADE').removeClass('invalid');
    return true;
  }
}

function checkState() {
  // get state (uppercase)
  const state = $('#STATE').val().toUpperCase();
  
  state_abbr = {
    'AL' : 'ALABAMA',
    'AK' : 'ALASKA',
    'AS' : 'AMERICA SAMOA',
    'AZ' : 'ARIZONA',
    'AR' : 'ARKANSAS',
    'CA' : 'CALIFORNIA',
    'CO' : 'COLORADO',
    'CT' : 'CONNECTICUT',
    'DE' : 'DELAWARE',
    'DC' : 'DISTRICT OF COLUMBIA',
    'FM' : 'MICRONESIA',
    'FL' : 'FLORIDA',
    'GA' : 'GEORGIA',
    'GU' : 'GUAM',
    'HI' : 'HAWAII',
    'ID' : 'IDAHO',
    'IL' : 'ILLINOIS',
    'IN' : 'INDIANA',
    'IA' : 'IOWA',
    'KS' : 'KANSAS',
    'KY' : 'KENTUCKY',
    'LA' : 'LOUISIANA',
    'ME' : 'MAINE',
    'MH' : 'MARSHALL ISLANDS',
    'MD' : 'MARYLAND',
    'MA' : 'MASSACHUSETTS',
    'MI' : 'MICHIGAN',
    'MN' : 'MINNESOTA',
    'MS' : 'MISSISSIPPI',
    'MO' : 'MISSOURI',
    'MT' : 'MONTANA',
    'NE' : 'NEBRASKA',
    'NV' : 'NEVADA',
    'NH' : 'NEW HAMPSHIRE',
    'NJ' : 'NEW JERSEY',
    'NM' : 'NEW MEXICO',
    'NY' : 'NEW YORK',
    'NC' : 'NORTH CAROLINA',
    'ND' : 'NORTH DAKOTA',
    'OH' : 'OHIO',
    'OK' : 'OKLAHOMA',
    'OR' : 'OREGON',
    'PW' : 'PALAU',
    'PA' : 'PENNSYLVANIA',
    'PR' : 'PUERTO RICO',
    'RI' : 'RHODE ISLAND',
    'SC' : 'SOUTH CAROLINA',
    'SD' : 'SOUTH DAKOTA',
    'TN' : 'TENNESSEE',
    'TX' : 'TEXAS',
    'UT' : 'UTAH',
    'VT' : 'VERMONT',
    'VI' : 'VIRGIN ISLAND',
    'VA' : 'VIRGINIA',
    'WA' : 'WASHINGTON',
    'WV' : 'WEST VIRGINIA',
    'WI' : 'WISCONSIN',
    'WY' : 'WYOMING'
  }
  
  if(state_abbr[state.replace(/\s+/g, '')] !== undefined) {
    // auto replace text with actual state name (uppercase first letter)
    $('#STATE').val(toTitleCase(state_abbr[state.replace(/\s+/g, '')]));
    // remove error
    $('#STATE').removeClass('invalid');
    $('div.row:nth-child(6) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)').css('color', '#222');
    $('div.row:nth-child(6) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)').html('Full state name');

    return true;
  // check if full state name is valid
  } else if(Object.values(state_abbr).indexOf(state) > -1) {
    // set to proper formatting
    $('#STATE').val(toTitleCase(state));

    // remove error
    $('#STATE').removeClass('invalid');
    $('div.row:nth-child(6) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)').css('color', '#222');
    $('div.row:nth-child(6) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)').html('Full state name');

    return true;
  } else {
    // show error
    $('#STATE').addClass('invalid');
    $('div.row:nth-child(6) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)').css('color', 'red');
    $('div.row:nth-child(6) > div:nth-child(2) > label:nth-child(1) > span:nth-child(2)').html('Please use the full, correct state name');

    return false;
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function validateForm() {
  if (!checkEmail() || !checkPhone() || !checkGrade() || !checkState()) {
    $('#submitApplication').text('Invalid responses');
    location.href = '#email';
    return false;
  } else {
    const fname = $('#FNAME').val();
    const lname = $('#LNAME').val();
    const name = `${fname} ${lname}`;
    const email = $('#email').val();
    const uid = ("hackchicago2018" + "/" + fname + "/" + lname + "/" + email).toUpperCase();

    // identify user in FS
    FS.identify(uid, {
      name: name,
      email: email,
      uid: uid
    });

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
