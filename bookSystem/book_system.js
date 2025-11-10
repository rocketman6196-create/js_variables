let books = [];
let editingIndex = -1; // Track which book is being edited

function addBook() {
    const bookName = document.getElementById('bookName').value.trim();
    const authorName = document.getElementById('authorName').value.trim();
    const bookDescription = document.getElementById('bookDescription').value.trim();
    const pagesNumber = parseInt(document.getElementById('pagesNumber').value);
    
    if (bookName && authorName && bookDescription && !isNaN(pagesNumber) && pagesNumber > 0) {
        const book = {
            name: bookName,
            authorName: authorName,
            bookDescription: bookDescription,
            pagesNumber: pagesNumber
        };
        
        if (editingIndex === -1) {
            // Add new book
            books.push(book);
        } else {
            // Update existing book
            books[editingIndex] = book;
            editingIndex = -1;
            document.getElementById('cancelEditBtn').style.display = 'none';
        }
        
        showBooks();
        clearInputs();
    } else {
        alert('Please fill in all fields correctly. Pages must be a positive number.');
    }
}

function showBooks() {
    const booksDiv = document.getElementById('books');
    
    if (books.length === 0) {
        booksDiv.innerHTML = '<p>No books added yet.</p>';
        return;
    }
    
    const booksHTML = books.map((book, index) => `
        <div>
            <h3>Book ${index + 1}: ${book.name}</h3>
            <p><strong>Author:</strong> ${book.authorName}</p>
            <p><strong>Description:</strong> ${book.bookDescription}</p>
            <p><strong>Pages:</strong> ${book.pagesNumber}</p>
            <button onclick="editBook(${index})">Edit</button>
            <button onclick="deleteBook(${index})">Delete</button>
        </div>
        <hr>
    `).join('');
    
    booksDiv.innerHTML = booksHTML;
}

function editBook(index) {
    const book = books[index];
    document.getElementById('bookName').value = book.name;
    document.getElementById('authorName').value = book.authorName;
    document.getElementById('bookDescription').value = book.bookDescription;
    document.getElementById('pagesNumber').value = book.pagesNumber;
    
    editingIndex = index;
    document.getElementById('cancelEditBtn').style.display = 'inline';
}

function deleteBook(index) {
    if (confirm('Are you sure you want to delete this book?')) {
        books.splice(index, 1);
        showBooks();
        
        // If we were editing this book, cancel edit mode
        if (editingIndex === index) {
            cancelEdit();
        } else if (editingIndex > index) {
            // Adjust editing index if we deleted a book before the one being edited
            editingIndex--;
        }
    }
}

function cancelEdit() {
    editingIndex = -1;
    document.getElementById('cancelEditBtn').style.display = 'none';
    clearInputs();
}

function clearInputs() {
    document.getElementById('bookName').value = '';
    document.getElementById('authorName').value = '';
    document.getElementById('bookDescription').value = '';
    document.getElementById('pagesNumber').value = '';
}

// Initialize the display when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showBooks();
});