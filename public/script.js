const form = document.querySelector('.form');
const main = document.querySelector('.main-content');

// function to create new book card using the data from the cloud

function newBook(doc) {
    let book = document.createElement('div');
    let list = document.createElement('ul');
    let name = document.createElement('li');
    let author = document.createElement('li');
    let pages = document.createElement('li');
    let read = document.createElement('li');
    let closeButton = document.createElement('button');
    let changeStatus = document.createElement('button');

    book.classList.add('book');
    closeButton.classList.add('button-remove-book')
    changeStatus.classList.add('change-status-button')
    read.classList.add('read-status')

    book.setAttribute('data-id', doc.id);
    name.textContent = `Name: ${doc.data().name}`;
    author.textContent = `Author: ${doc.data().author}`;
    pages.textContent = `Pages: ${doc.data().pages}`;
    read.textContent = `Read: ${doc.data().read}`;
    closeButton.textContent = 'x';
    changeStatus.textContent = '';

    list.appendChild(name);
    list.appendChild(author);
    list.appendChild(pages);
    list.appendChild(read);
    read.appendChild(changeStatus);

    book.appendChild(list);
    book.appendChild(closeButton);

    main.appendChild(book);

    if (doc.data().read == 'yes') {
        book.classList.add('status-read');
    }

    closeButton.addEventListener('click', (e) => {
        e.stopPropagation();

        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('books').doc(id).delete();
    });

    changeStatus.addEventListener('click', (e) => {
        e.stopPropagation();

        e.target.parentElement.parentElement.parentElement.classList.toggle('status-read');
        let id = e.target.parentElement.parentElement.parentElement.getAttribute('data-id');
        if (doc.data().read == 'yes') {
            db.collection('books').doc(id).update({read: 'no'})
            setTimeout(() => {window.location.reload()}, 150)
        } else {
            db.collection('books').doc(id).update({read: 'yes'})
            setTimeout(() => {window.location.reload()}, 150)
        }
    })
}

// saving data from the front-end to the cloud

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let formWrapper = document.querySelector('.form-wrapper');
    formWrapper.classList.toggle('form-hide');
    formWrapper.classList.toggle('form-display');

    db.collection('books').add({
        name: form.name.value,
        author: form.author.value,
        pages: form.pages.value,
        read: form.read.value
    });

    form.name.value = '';
    form.author.value = '';
    form.pages.value = '';
    form.read.value = '';
})

db.collection('books').orderBy('author').onSnapshot(snapshot =>{
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if(change.type == 'added') {
            newBook(change.doc);
        } else if (change.type == 'removed') {
            let list = main.querySelector(`[data-id=${change.doc.id}]`);
            main.removeChild(list);
        }
    })
})

















// let books = [];

// class Book {
//     constructor(name, author, pages, read) {
//         this.name = name;
//         this.author = author;
//         this.pages = pages;
//         this.read = read;
//     }
// }

// let x = new Book('caca', 'popo', 2020, 'yes');


// books.push(x);


// function createBook() {
//     const inputName = document.querySelector('.input-name').value;
//     const inputAuthor = document.querySelector('.input-author').value;
//     const inputPages = document.querySelector('.input-pages').value;
//     const inputRead = document.querySelector('.input-read').value;

//     let newBook = new Book(inputName, inputAuthor, inputPages, inputRead);
//     books.push(newBook);
// }

// function createBookCard() {
//     const main = document.querySelector('main');

//     for (i = 0; i < books.length; i++) {
//         const bookCard = document.createElement('div');
//         const list = document.createElement('ul');
//         const name = document.createElement('li');
//         const author = document.createElement('li');
//         const pages = document.createElement('li');
//         const read = document.createElement('li');
//         const pagesValue = document.createElement('input');
//         pagesValue.type = 'number';
//         pagesValue.value = books[i].pages
//         const removeBookButton = document.createElement('button');
//         let readValue = books[i].read;

//         name.textContent = `Name: ${books[i].name}`;
//         author.textContent = `Author: ${books[i].author}`;
//         pages.textContent = `Pages:`;
//         read.textContent = `Read: ${books[i].read}`;
//         removeBookButton.textContent = 'Remove book'

//         bookCard.classList.add('book');
//         removeBookButton.classList.add('button-remove-book');
//         read.classList.add('read-value');
        
//         pages.appendChild(pagesValue);
//         list.appendChild(name);
//         list.appendChild(author);
//         list.appendChild(pages);
//         list.appendChild(read);
//         bookCard.appendChild(list);
//         bookCard.appendChild(removeBookButton);
//         main.appendChild(bookCard);

//         removeBookButton.addEventListener('click', () => {
//             if(confirm('Are you sure you want to remove this book from the library?')) {
//                 main.removeChild(bookCard);
//             } else {
//                 return;
//             }
//         })

//         read.addEventListener('click', () => {
//             if(readValue === 'yes') {
//                 read.textContent = 'Read: no';
//                 readValue = 'no';
//             } else {
//                 read.textContent = 'Read: yes';
//                 readValue = 'yes';
//             }
//         })
//     }
// }

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

// function submitBook() {
//     const addBookButton = document.querySelector('.submit-book-button');
//     addBookButton.addEventListener('click', createBook)
// }

displayForm();
// submitBook();
// createBookCard();