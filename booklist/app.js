// Book constructor
class Book {
  constructor(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {
  addBookToList(book) {
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
  }
  // Show Alert
  showAlert(message, className) {
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
  deleteBook(target) {
    if(target.classList.contains('delete')){
      if(target.parentElement.parentElement.localName === 'tr'){
      target.parentElement.parentElement.remove(); 
      }
    }
  }

  clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static displayBooks(){
    const books = Store.getBooks();
    const ui = new UI;
    books.forEach(function(book){
      // Add book to UI
      ui.addBookToList(book);
    })
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.some(function(book, index) {
      if(book.isbn === isbn) { 
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
      }
      return book.isbn === isbn
    });
  }
}

// DOM Load Event
document.addEventListener('DOMCOntentLoaded', Store.displayBooks());

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
    // Add to local storage
    Store.addBook(book);
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
  // Delete
  ui.deleteBook(e.target);
  // Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
  // Show alert
  ui.showAlert('Book removed', 'success');

});