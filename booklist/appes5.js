// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.addBookToList = function(book) {
  const list = document.getElementById('book-list');
  // Create tr element
  const row = document.createElement('tr');
  // Insert cols
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</td>
  `;
  list.appendChild(row);
  console.log(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className) {
  // Create div
  const div = document.createElement('div');
  // Add alert color classes
  div.className = `alert ${className}`;
  // Append message as textnode
  div.appendChild(document.createTextNode(message));
  // Where to append div
  const container = document.querySelector('.container');
  // Append div before form
  const form = document.querySelector('#book-form');
  // Append
  container.insertBefore(div, form);
  // Timeout and remove div
  setTimeout(function() {
    document.querySelector('.alert').remove();
  }, 3000);

}

// Delete book
UI.prototype.deleteBook = function(target) {
  if(target.classList.contains('delete')){
    console.log(target.parentElement.parentElement);
    if(target.parentElement.parentElement.localName === 'tr'){
     target.parentElement.parentElement.remove(); 
    }
  }
}

UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event listener for add book
document.getElementById('book-form').addEventListener('submit', function(e) {
  // Get form values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // Instantiate a book
  const book = new Book(title, author, isbn);
  // Instantiate UI
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    // Show alert
    ui.showAlert('Book added', 'success');
    // Clear fields
    ui.clearFields();
  }
  // Prevents form default behavior
  e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();
  // Show alert
  ui.deleteBook(e.target);
    ui.showAlert('Book removed', 'success');

});