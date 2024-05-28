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

        books.forEach((book, index) => {
            const bookItem = document.createElement('div');
            bookItem.className = 'book-item';
            bookItem.innerHTML = `
                <span>${book.title} oleh ${book.author} (${book.year})</span>
                <div>
                    <button class="btn btn-secondary" onclick="toggleBookStatus(${index})">${book.isCompleted ? 'Belum selesai' : 'Selesai'}</button>
                    <button class="btn btn-danger" onclick="removeBook(${index})">Hapus</button>
                </div>
            `;

            if (book.isCompleted) {
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
        const year = document.getElementById('year').value;

        const newBook = {
            id: +new Date(),
            title,
            author,
            year,
            isCompleted: false
        };

        books.push(newBook);
        saveBooks();
        renderBooks();

        bookForm.reset();
    });

    window.toggleBookStatus = (index) => {
        books[index].isCompleted = !books[index].isCompleted;
        saveBooks();
        renderBooks();
    };

    window.removeBook = (index) => {
        books.splice(index, 1);
        saveBooks();
        renderBooks();
    };

    renderBooks();
});
