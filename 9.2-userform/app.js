// Add event listeners
['name', 'zip', 'email', 'phone'].forEach(field => {
  document.getElementById(field).addEventListener('blur', validateField);
});

// All regex fields
const re_name = /^[a-zA-Z]{2,10}$/;
const re_zip = /^[0-9]{5}(-[0-9]{4})?$/;
const re_email = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const re_phone = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

// Validate Field
function validateField(e) {
  // Get field regex based on target.id
  const re = eval(`re_${e.target.id}`);
  // Test regex with input value
  if(!re.test(e.target.value)){
    e.target.classList.add('is-invalid');
    // Add keyup event if invalid input
    document.getElementById(e.target.id).addEventListener('keyup', validateField);
  } else {
    e.target.classList.remove('is-invalid');
    // Remove keyup event for valid input
    document.getElementById(e.target.id).removeEventListener('keyup', validateField);
  }
};


