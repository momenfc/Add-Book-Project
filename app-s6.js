class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        // get parent
        const list = document.getElementById('book-list');
        // create row
        const row = document.createElement('tr');
        // create td in row
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td> <a href="#" class="delete">×</a> </td>
            `;
        // append row to list
        list.appendChild(row)
    }

    showAlert(message, className) {
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

        // Alert timeout 
        setTimeout(function () {
            document.querySelector('.alert').remove();
        }, 2000)
    }

    deleteBook(target) {
        if (target.className === 'delete') {
            target.parentElement.parentElement.remove();
            const ui = new UI();
            ui.showAlert('book removed!', 'btn-warning');
        };
    }

    clearFiled() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// local storage class
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

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book){
            const ui =new UI;

            // add books to UI
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
        
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        }); 
        
        localStorage.setItem('books', JSON.stringify(books));

    }
}
// DOM load event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

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

        // add to LS
        Store.addBook(book);
        // clear filed
        ui.clearFiled();
        ui.showAlert(`book added successfully`, 'btn-success')
    };

    e.preventDefault();
});

// event delete book listener
document.getElementById('book-list').addEventListener('click', function (e) {
    const ui = new UI();
    // delete book
    ui.deleteBook(e.target);

    // remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    e.preventDefault()
})