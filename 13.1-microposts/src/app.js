import { http } from './http';
import { ui } from './ui';

// Get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);
// Listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);
// Listen for delete post
document.querySelector('#posts').addEventListener('click', deletePost);
// Listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);
// Listen for cancel
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http.get('http://localhost:3000/posts')
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

function submitPost(post) {
  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    title,
    body
  }

  // Validate input
  if(title === '' || body === '') {
    ui.showAlert('Please fill all fields', 'alert alert-danger')
  } else {
    // Check for id
    if(id === '') {
      // Create post
      http.post('http://localhost:3000/posts', data)
        .then(data => {
          ui.showAlert('Post added', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err))
    } else {
      // Update post
      http.put(`http://localhost:3000/posts/${id}`, data)
        .then(data => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch(err => console.log(err))
    }
 }
}

// Delete Post
function deletePost(e) {
  const deleteLink = e.target.parentElement;
  if(deleteLink.classList.contains('delete')){
    if(confirm('Are you sure?')){
      const id = deleteLink.dataset.id;
      http.delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          ui.showAlert('Post deleted', 'alert alert-success');
          getPosts();
        })
        .catch(err => console.log(err))
    }
  }
}

// Edit State
function enableEdit(e) {
  const editLink = e.target.parentElement;
  if(editLink.classList.contains('edit')){
    const id = editLink.dataset.id;
    const title = editLink.previousElementSibling.previousElementSibling.textContent;
    const body = editLink.previousElementSibling.textContent;
    const data = {
      id,
      title,
      body
    }
    // Fill form with current post
    ui.fillForm(data);
  }
  e.preventDefault();
}

// Cancel Edit State
function cancelEdit(e){
  if(e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
}