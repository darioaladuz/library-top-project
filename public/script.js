let books = [];

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

let x = new Book('caca', 'popo', 2020, 'yes');


books.push(x);


function createBook() {
    const inputName = document.querySelector('.input-name').value;
    const inputAuthor = document.querySelector('.input-author').value;
    const inputPages = document.querySelector('.input-pages').value;
    const inputRead = document.querySelector('.input-read').value;

    let newBook = new Book(inputName, inputAuthor, inputPages, inputRead);
    books.push(newBook);
}

function createBookCard() {
    const main = document.querySelector('main');

    for (i = 0; i < books.length; i++) {
        const bookCard = document.createElement('div');
        const list = document.createElement('ul');
        const name = document.createElement('li');
        const author = document.createElement('li');
        const pages = document.createElement('li');
        const read = document.createElement('li');
        const pagesValue = document.createElement('input');
        pagesValue.type = 'number';
        pagesValue.value = books[i].pages
        const removeBookButton = document.createElement('button');
        let readValue = books[i].read;

        name.textContent = `Name: ${books[i].name}`;
        author.textContent = `Author: ${books[i].author}`;
        pages.textContent = `Pages:`;
        read.textContent = `Read: ${books[i].read}`;
        removeBookButton.textContent = 'Remove book'

        bookCard.classList.add('book');
        removeBookButton.classList.add('button-remove-book');
        read.classList.add('read-value');
        
        pages.appendChild(pagesValue);
        list.appendChild(name);
        list.appendChild(author);
        list.appendChild(pages);
        list.appendChild(read);
        bookCard.appendChild(list);
        bookCard.appendChild(removeBookButton);
        main.appendChild(bookCard);

        removeBookButton.addEventListener('click', () => {
            if(confirm('Are you sure you want to remove this book from the library?')) {
                main.removeChild(bookCard);
            } else {
                return;
            }
        })

        read.addEventListener('click', () => {
            if(readValue === 'yes') {
                read.textContent = 'Read: no';
                readValue = 'no';
            } else {
                read.textContent = 'Read: yes';
                readValue = 'yes';
            }
        })
    }
}

function displayForm() {
    const buttons = document.querySelectorAll('.form-button');
    const formWrapper = document.querySelector('.form-wrapper');
    buttons.forEach(button => button.addEventListener('click', () => {
        formWrapper.classList.toggle('form-display')
    }))
}

function displayForm() {
    const buttons = document.querySelectorAll('.form-button');
    const formWrapper = document.querySelector('.form-wrapper');
    buttons.forEach(button => button.addEventListener('click', () => {
        formWrapper.classList.toggle('form-display');
        formWrapper.classList.toggle('form-hide');
    }))
}

function submitBook() {
    const addBookButton = document.querySelector('.submit-book-button');
    addBookButton.addEventListener('click', createBook)
}

displayForm();
submitBook();
createBookCard();