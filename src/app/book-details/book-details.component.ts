import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { BooksComponent } from "../pages/books/books.component";

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, BooksComponent],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {

  public bookList: any[] = [];

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  loadBooks() {
    this.http.get("http://localhost:8080/book/get-book").subscribe((data: any) => {
      this.bookList = data;


      this.bookList.forEach(book => {
        if (book.qty <= 0) {
          book.outOfStock = true; 
        }
      });
    });
  }
}

