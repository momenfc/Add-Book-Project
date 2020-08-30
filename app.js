// book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

UI.prototype.addBookToList = function (book) {

    const list = document.getElementById('book-list');
    // create row
    const row = document.createElement('tr');
    // create td in row
    row.innerHTML = `
        <td> ${book.title} </td>
        <td> ${book.author} </td>
        <td> ${book.isbn} </td>
        <td> <a href="#" class="delete">×</a> </td>
        `;
    // append row to list
    list.appendChild(row)
}

// create function to show Alert
UI.prototype.showAlert = function (message, className) {
    // create div to show messages
    const div = document.createElement('div');
    // add text of messages
    div.appendChild(document.createTextNode(message))
    // add class to div
    div.className = `alert ${className}`;
    // get parant
    const container = document.querySelector('.container');
    // grt form
    const form = document.querySelector('#book-form');
    // append div to container
    container.insertBefore(div, form);

    // timeout after 3sec
    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000)
}

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
        const ui = new UI();
        ui.showAlert('book removed!', 'btn-warning');
    };
}

// creat fun to clear input value
UI.prototype.clearFiled = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// event add book listener
document.getElementById('book-form').addEventListener('submit', function (e) {
    // define ui vars
    const
        title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

    // instantiate book
    const book = new Book(title, author, isbn);
    // instantiate UI
    const ui = new UI();
    // do not accept null value
    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('please fill in all fildes', 'btn-danger');
    } else {
        // add book to list
        ui.addBookToList(book);
        // clear filed
        ui.clearFiled();
        ui.showAlert(`book added successfully`, 'btn-success')
    };

    e.preventDefault();
});

// event delete book listener
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    ui.deleteBook(e.target);

    e.preventDefault()
})