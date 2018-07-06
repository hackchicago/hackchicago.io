function getParam(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// display error messages
if (getParam('error')) $('#status').text(`Error: ${getParam('error')}. Please retry.`);

// check email confirmation + phone number when user leaves field
$('#student_email').blur(function() { checkStudentEmail(); });
$('#student_email_confirm').blur(function() { checkStudentEmail(); });
$('#parent_email').blur(function() { checkParentEmail(); });
$('#parent_email_confirm').blur(function() { checkParentEmail(); });

function checkStudentEmail() {
  // set email to lowercase
  $('#student_email').val($('#student_email').val().toLowerCase());
  $('#student_email_confirm').val($('#student_email_confirm').val().toLowerCase());
  // check for email confirmation
  if(!($('#student_email').val() === $('#student_email_confirm').val()) && $('#student_email').val() !== '' && $('#student_email_confirm').val() !== '') {
    // handle emails not being equal
    $('#student_email').addClass('invalid');
    $('#student_email_confirm').addClass('invalid');
    return false;
  } else {
    $('#student_email').removeClass('invalid');
    $('#student_email_confirm').removeClass('invalid');
    return true;
  }
}

function checkParentEmail() {
  // set email to lowercase
  $('#parent_email').val($('#parent_email').val().toLowerCase());
  $('#parent_email_confirm').val($('#parent_email_confirm').val().toLowerCase());
  // check for email confirmation
  if(!($('#parent_email').val() === $('#parent_email_confirm').val()) && $('#parent_email').val() !== '' && $('#parent_email_confirm').val() !== '') {
    // handle emails not being equal
    $('#parent_email').addClass('invalid');
    $('#parent_email_confirm').addClass('invalid');
    return false;
  } else {
    $('#parent_email').removeClass('invalid');
    $('#parent_email_confirm').removeClass('invalid');
    return true;
  }
}

function submitSignatureForm() {
  if (!checkStudentEmail() || !checkParentEmail()) {
    $('#signDocuments').text('Invalid responses');
    location.href = '#start';
  } else {
    const formData = {
      studentName: $('#student_fullname').val(),
      studentEmail: $('#student_email').val(),
      parentName: $('#parent_fullname').val(),
      parentEmail: $('#parent_email').val()
    };
    $('#signDocuments').text('Loading..');
    fetch('https://api.hackchicago.io/v1/signatures', {
      method: 'POST',
      body: formData,
      headers:{
        'Content-Type': 'application/json'
      }
    }).catch(error => console.error('Error:', error));
  }
}