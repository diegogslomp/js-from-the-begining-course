const data = [
  {
    name: 'Joan Doe',
    age: 32,
    gender: 'female',
    lookingfor: 'male',
    location: 'Boston MA',
    image: 'https://randomuser.me/api/portraits/women/80.jpg',
  },
  {
    name: 'Jen Smith',
    age: 23,
    gender: 'female',
    lookingfor: 'male',
    location: 'Miami FL',
    image: 'https://randomuser.me/api/portraits/women/82.jpg',
  },
  {
    name: 'Daisy Johnson',
    age: 38,
    gender: 'female',
    lookingfor: 'female',
    location: 'Lynn MA',
    image: 'https://randomuser.me/api/portraits/women/83.jpg',
  }
];

const profiles = profileIterator(data);
// Show next profiles
nextProfile();

// Next event
document.getElementById('next').addEventListener('click', nextProfile);

// Next profile display
function nextProfile(e) {
  const currentProfile = profiles.next().value;

  if(currentProfile != undefined) {
    document.querySelector('.profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Gender: ${currentProfile.gender}</li>
        <li class="list-group-item">Looking for: ${currentProfile.lookingfor}</li>
      </ul>`

    // Change image
    document.querySelector('.imageDisplay').innerHTML = `<img src="${currentProfile.image}">`
  } else {
    // No more profiles
    window.location.reload();
  }
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;
  return {
    next: function() {
      return nextIndex < profiles.length ? 
        { value: profiles[nextIndex++], done: false } :
        { done: true }
    }
  }
}