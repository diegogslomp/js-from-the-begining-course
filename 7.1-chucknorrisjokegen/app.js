document.querySelector('.get-jokes').addEventListener('click', getJokes);

function getJokes(e) {
  // Number form input
  const number = document.querySelector('input[type="number"]').value;

  // Get json from api
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `http://api.icndb.com/jokes/random/${number}`, true);

  xhr.onload = function() {
    if(xhr.status === 200) {
      // Json response
      const response = JSON.parse(this.responseText);
      // innerHTML to be added
      let output = '';
      if (response.type === 'success') {
        response.value.forEach(function(joke){
          output += `<li>${joke.joke}</li>`;
        });
      } else {
        output += '<li>Something get wrong</li>'
      }
      document.querySelector('.jokes').innerHTML = output;
    }
  }

  xhr.send();
  e.preventDefault();
}