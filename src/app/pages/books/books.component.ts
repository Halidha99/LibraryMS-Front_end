import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent {

  public book: any = {
    bookName: '',
    authorName: '',
    category: '',
    qty: 1
  };

  public bookList: any[] = [];
  public filteredBookList: any[] = [];
  public searchTerm: string = '';

  constructor(private http: HttpClient) {
    this.loadBooks();
  }


  validateQuantity() {
    if (this.book.qty < 1) {
      this.book.qty = 1;
      alert('Quantity cannot be less than 1.');
    }
  }


  public addBook() {
    if (this.book.qty < 1) {
      alert("Quantity must be at least 1.");
      return;
    }

    this.http.post("http://localhost:8080/book/add-book", this.book)
      .subscribe(() => {
        alert("Book Added Successfully!");
        this.loadBooks();
        this.resetForm();
      });
  }


  loadBooks() {
    this.http.get("http://localhost:8080/book/get-book").subscribe((data: any) => {
      this.bookList = data;
      this.filteredBookList = data;
    });
  }


  deleteBookById(id: any) {
    this.http.delete(`http://localhost:8080/book/delete-by-id/${id}`).subscribe(data => {
      alert("Book deleted!");
      this.loadBooks();
    });
  }
  setBookId(bookId: string) {
    const selectedBook = this.bookList.find(book => book.id === bookId);
    if (selectedBook) {
      this.book.id = selectedBook.id;
      this.book.bookName = selectedBook.bookName;
      this.book.authorName = selectedBook.authorName;
      this.book.category = selectedBook.category;
    }
  }


  public bookTemp: any = {};

  updateBook(book: any) {
    this.bookTemp = { ...book };
  }


  saveBook() {
    this.http.put("http://localhost:8080/book/update-book", this.bookTemp).subscribe(data => {
      alert("Book Updated!");
      this.loadBooks();
    });
  }


  searchBooks() {
    if (this.searchTerm) {

      this.filteredBookList = this.bookList.filter(book =>
        book.bookName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {

      this.filteredBookList = this.bookList;
    }
  }

  public returnBook(bookId: any): void {
    this.http.post(`http://localhost:8080/borrow/return-book/${bookId}`, {}).subscribe(
      (data) => {
        alert("Book returned successfully!");


        this.bookList = this.bookList.map(book =>
          book.id === bookId ? { ...book, qty: book.qty + 1 } : book
        );

        this.filteredBookList = this.bookList;
      },
    
    );
  }

  public issueBook(bookId: any): void {
    const book = this.bookList.find(book => book.id === bookId);

    if (book && book.qty > 0) {
      this.http.post(`http://localhost:8080/borrow/issue-book/${bookId}`, {}).subscribe(
        (data) => {
          alert("Book issued successfully!");


          this.bookList = this.bookList.map(book =>
            book.id === bookId ? { ...book, qty: book.qty - 1 } : book
          );

          if (book.qty - 1 === 0) {
            alert("This book is now out of stock.");
          }


          this.filteredBookList = this.bookList;
        },

      );
    } else {
      alert("Book is out of stock and cannot be issued.");
    }
  }

  private resetForm() {
    this.book = {
      bookName: '',
      authorName: '',
      category: '',
      qty: ''
    };
  }


}
