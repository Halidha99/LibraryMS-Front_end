import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberDetailsComponent } from '../../member-details/member-details.component';
import { BookDetailsComponent } from '../../book-details/book-details.component';

@Component({
  selector: 'app-return-book',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule, MemberDetailsComponent, BookDetailsComponent],
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  public bookList: any[] = [];
  public bookIssues: any[] = [];
  bookTemp = { id: '', qty: 0, returned: false };
  private borrowingPeriod: number = 30;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadIssuedBooks();
  }

  loadBooks(): void {
    this.http.get<any[]>(`http://localhost:8080/book/get-book`).subscribe(
      (data) => {
        this.bookList = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading books:', error);
        alert('Failed to load books.');
      }
    );
  }

  loadIssuedBooks(): void {
    this.http.get<any[]>(`http://localhost:8080/borrow/get-borrow`).subscribe(
      (data) => {
        this.bookIssues = data.map(issue => ({
          ...issue,
          dueDate: this.calculateDueDate(issue.issueDate),
          overdue: this.calculateOverdue(issue.issueDate, issue.returnDate),
          returned: issue.returned || false
        }));
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading issued books:', error);
        alert('Failed to load issued books.');
      }
    );
  }

  calculateDueDate(issueDate: string): string {
    const issueDateObj = new Date(issueDate);
    issueDateObj.setDate(issueDateObj.getDate() + this.borrowingPeriod);
    return issueDateObj.toISOString().split('T')[0];
  }

  calculateOverdue(issueDate: string, returnDate: string): string {
    const dueDate = new Date(this.calculateDueDate(issueDate));
    const returnDateObj = new Date(returnDate);

    if (returnDateObj > dueDate) {
      const overdueDays = Math.ceil((returnDateObj.getTime() - dueDate.getTime()) / (1000 * 3600 * 24));
      return `${overdueDays} days overdue`;
    } else {
      return 'On time';
    }
  }

  updateReturnStatus(issue: any, isReturned: boolean): void {
    if (isReturned !== issue.returned) {
      this.http.put(`http://localhost:8080/borrow/mark-returned/${issue.borrowId}`, { returned: isReturned }, { withCredentials: true }).subscribe(
        () => {
          issue.returned = isReturned;
          alert(`Book marked as ${isReturned ? 'returned' : 'not returned'}`);
          if (isReturned) {
            this.updateBookQuantity(issue.book.id, 1);
          }
        },

      );

    }
  }

  updateBookQuantity(bookId: number, qtyChange: number): void {
    const book = this.bookList.find(b => b.id === bookId);
    if (book) {
      book.qty += qtyChange;
      if (book.qty < 0) book.qty = 0;

      this.http.put(`http://localhost:8080/book/update-book`, book).subscribe(
        () => {
          alert('Book quantity updated!');
          this.loadBooks();
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating book quantity:', error);
          alert('Failed to update book quantity.');
        }
      );
    }
  }

  updateBook(book: any): void {
    this.bookTemp = { ...book };
  }

  saveBook(): void {
    this.http.put(`http://localhost:8080/book/update-book`, this.bookTemp).subscribe(
      () => {
        alert('Book updated successfully');
        this.loadBooks();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating book:', error);
        alert('Failed to update book.');
      }
    );
  }

  isBookReturned(issue: any): boolean {
    return issue.returned;
  }
}
