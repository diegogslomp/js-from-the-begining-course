// Add event listeners
document.getElementById('name').addEventListener('blur', validateName);
document.getElementById('zipcode').addEventListener('blur', validateZipcode);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);

function validateName(e) {
  const re = /^[a-zA-Z]{2,10}$/;
  if(!re.test(e.target.value)){
    e.target.classList.add('is-invalid');
  } else {
    e.target.classList.remove('is-invalid');
  }
};

function validateZipcode(e) {

};

function validateEmail(e) {

};

function validatePhone(e) {

};


