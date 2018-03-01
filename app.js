// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI(){}

// Add book to list prototype 
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');

  // Insert Columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

  // Appending the table row 'tr' to the list
  list.appendChild(row);

}

// Show alert prototype
UI.prototype.showAlert = function(message, className){
  // Create a div
  const div = document.createElement('div');

  //Add className
  div.className =`alert ${className}`;

  // Add text
  div.appendChild(document.createTextNode(message));

  // Get parent
  const container = document.querySelector('.container');

  // Get the form
  const form = document.getElementById('book-form');

  // Inserting the alert / you always want to insert from the parent element
  // 1st parameter is what you want to insert 2nd is what you want to insert before
  container.insertBefore(div, form);

  // Timeout after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000);
}

// Delete Book prototype
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields prototype 
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Eventlistener for add book
document.getElementById('book-form').addEventListener('submit',
  function(e){
    // Get form values
    const title = document.getElementById('title').value
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Instantiate new book object
    const book = new Book(title, author, isbn);

    // Instantiate new UI object
    const ui = new UI();

    // Validate form
    if(title === '' || author ==='' || isbn ===''){
      // Error alert
      ui.showAlert('Please fill in all fields', 'error');
    } else {
      // Add book to list
      ui.addBookToList(book);

      // Show alert
      ui.showAlert('Book Added', 'success');

      // Clear fields
      ui.clearFields();      
    }

    e.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', 
  function(e){
    // Instantiate new UI object
    const ui = new UI();

    // Deleting targeted book from list
    ui.deleteBook(e.target);

    // Show alert
    ui.showAlert('Book Removed', 'success');

    e.preventDefault();
});

