document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('bookForm');
    const unreadBooks = document.getElementById('unreadBooks');
    const readBooks = document.getElementById('readBooks');

    let books = JSON.parse(localStorage.getItem('books')) || [];

    const saveBooks = () => {
        localStorage.setItem('books', JSON.stringify(books));
    };

    const renderBooks = () => {
        unreadBooks.innerHTML = '';
        readBooks.innerHTML = '';

        books.forEach((book) => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.setAttribute('data-id', book.id); 

            bookItem.innerHTML = `
                <span>${book.title} oleh ${book.author} (${book.year})</span>
                <div>
                    <button class="btn btn-secondary" onclick="toggleBookStatus(${book.id})">${book.isComplete ? 'Belum selesai' : 'Selesai'}</button>
                    <button class="btn btn-danger" onclick="removeBook(${book.id})">Hapus</button>
                </div>
            `;

            if (book.isComplete) {
                readBooks.appendChild(bookItem);
            } else {
                unreadBooks.appendChild(bookItem);
            }
        });
    };

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const year = parseInt(document.getElementById('year').value); 

        const generateId = () => {
            return +new Date() + Math.floor(Math.random() * 1000);
        };

        const newBook = {
            id: generateId(), 
            title,
            author,
            year,
            isComplete: false
        };

        books.push(newBook);
        saveBooks();
        renderBooks();

        bookForm.reset();
    });

    window.toggleBookStatus = (id) => {
        const bookIndex = books.findIndex(book => book.id === id);
        if (bookIndex !== -1) {
            books[bookIndex].isComplete = !books[bookIndex].isComplete;
            saveBooks();
            renderBooks();
        }
    };

    window.removeBook = (id) => {
        books = books.filter(book => book.id !== id);
        saveBooks();
        renderBooks();
    };

    renderBooks();
});
