// InputFields and regex
fields = [
  {
    id: 'name',
    re: /^[a-zA-Z]{2,10}$/
  },
  {
    id: 'zip',
    re: /^[0-9]{5}(-[0-9]{4})?$/
  },
  {
    id: 'email',
    re: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
  },
  {
    id: 'phone',
    re: /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/
  }
];

// Add event listeners
fields.forEach(field => {
  document.getElementById(field.id).addEventListener('blur', validateField);
  document.getElementById(field.id).addEventListener('keyup', validateField);
});

// Validate Field
function validateField(e) {
  console.log(e.target.id);
  // Get field regex based on target.id
  const re = fields.find(field => field.id === e.target.id).re;
  // Test regex with input value, change class if valid/invalid
  !re.test(e.target.value) ?
    e.target.classList.add('is-invalid') :
    e.target.classList.remove('is-invalid');
};
