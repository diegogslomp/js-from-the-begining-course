class UI {
  constructor() {
    this.posts = document.querySelector('#posts');
    this.title = document.querySelector('#title');
    this.body = document.querySelector('#body');
    this.id = document.querySelector('#id');
    this.cardForm = document.querySelector('.card-form');
    this.formEnd = document.querySelector('.form-end');
    this.postSubmit = document.querySelector('.post-submit');
    this.postContainer = document.querySelector('.postContainer');
    this.forState = 'add';
  }

  showPosts(posts) {
    let output = '';
    posts.forEach(post => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil-alt"></i>
            </a>
            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-times"></i>
            </a>
          </div>
        </div>
      `;
    });
    this.posts.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    // Create alert div
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    // Insert alert
    this.postContainer.insertBefore(div, this.posts);
    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 2000);
  }

  clearAlert() {
    const currentAlert = document.querySelector('.alert');
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.title.value = '';
    this.body.value = '';
    // Clear hidden ID Input
    this.id.value = '';

  }
  // Fill form to edit
  fillForm(data) {
    this.title.value = data.title;
    this.body.value = data.body;
    this.id.value = data.id;

    this.changeFormState('edit');
  }

  // Change form state
  changeFormState(state) {
    if(state === 'edit') {
      // Change submit button to edit
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-block';
      // Create cancel button
      const cancelButton = document.createElement('button');
      cancelButton.className = 'post-cancel btn btn-light btn-block';
      cancelButton.appendChild(document.createTextNode('Cancel Edit'));
      // Append cancel button inside cardform and before endform
      this.cardForm.insertBefore(cancelButton, this.formEnd);

    } else {

      // if not allways add state
      this.postSubmit.textContent = 'Post It';
      this.postSubmit.className = 'post-submit btn btn-primary btn-block';
      // Remove cancel button if exists
      const cancelButton = document.querySelector('.post-cancel');
      if(cancelButton){
        cancelButton.remove();
      }
      // Clear Fields
      this.clearFields();
    }
  }
}

export const ui = new UI();