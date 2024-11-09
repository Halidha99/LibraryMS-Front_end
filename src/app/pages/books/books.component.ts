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
}
