import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BooksComponent } from '../pages/books/books.component';
import { MemberDetailsComponent } from '../member-details/member-details.component';

@Component({
  selector: 'app-issuse-books',
  standalone: true,
  imports: [CommonModule, HttpClientModule,BooksComponent,FormsModule,MemberDetailsComponent],
  templateUrl: './issuse-books.component.html',
  styleUrl: './issuse-books.component.css'
})
export class IssuseBooksComponent implements OnInit {
  public issuseBook = {
     id: '',
      memberId: '',
      issueDate: '',
      returnDate: '' };
  public bookList: any[] = [];
  public memberList: any[] = [];
  public bookIssues: any[] = [];

  public issuseTemp: any = {};


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadMembers();
    this.loadIssuedBooks();
  }


  loadBooks(): void {
    this.http.get(`http://localhost:8080/book/get-book`).subscribe((data: any) =>{
      this.bookList = data;
    }
);


}

  loadMembers(): void {
    this.http.get(`http://localhost:8080/member/get-member`).subscribe((data:any)=>{
   this.memberList=data;
    });

  }

  loadIssuedBooks(): void {
    this.http.get<any[]>(`http://localhost:8080/borrow/get-borrow`).subscribe(
      (data) => {
        this.bookIssues = data;
        this.resetForm();
      },

    );
  }

  public addBorrow(): void {
    if (!this.issuseBook.id || !this.issuseBook.memberId || !this.issuseBook.issueDate || !this.issuseBook.returnDate) {
      alert("Please fill out all fields");
      return;
    }


    const selectedBook = this.bookList.find(book => book.id === this.issuseBook.id);
    if (selectedBook && selectedBook.qty <= 0) {
      alert("Out of Stock");
      return;
    }

    const borrowData = {
      book: { id: this.issuseBook.id },
      member: { memberId: this.issuseBook.memberId },
      issueDate: this.issuseBook.issueDate,
      returnDate: this.issuseBook.returnDate
    };

    this.http.post(`http://localhost:8080/borrow/add-borrow`, borrowData).subscribe(
      (response) => {
        alert("Book issued successfully");
        this.updateBookQuantity(this.issuseBook.id, -1);
        this.loadIssuedBooks();
        this.resetForm();
      },
      (error: HttpErrorResponse) => {
        console.error("Error issuing book:", error);
        alert("All out. It's a sad day for book lovers.");
      }
    );
  }



  public deleteBorrow(id: string): void {
    this.http.delete(`http://localhost:8080/borrow/delete-by-id/${id}`).subscribe(
      () => {
        alert("Issue Borrow record deleted successfully!");


        this.bookIssues = this.bookIssues.filter(issue => issue.id !== id);
      },


    );
  }

  updateBorrow(issue: any): void {
    this.issuseTemp = { ...issue };
  }

  saveBorrow(): void {
    this.http.put(`http://localhost:8080/borrow/update-borrow`, this.issuseTemp).subscribe(
      () => {
       alert("Borrow record updated successfully!");
        this.loadIssuedBooks();
      },

    );
  }

  private updateBookQuantity(bookId: string, adjustment: number): void {
    const book = this.bookList.find(b => b.id === bookId);
    if (book) {
      book.qty = (book.qty || 0) + adjustment;
      if (book.qty === 0) {
        alert("Out of Stock");
      }
    }
  }

public resetForm(){
    this.issuseBook = { id: '', memberId: '', issueDate: '', returnDate: '' };


  }
  validateDates(): boolean {
    const { issueDate, returnDate } = this.issuseBook;

    
    if (!issueDate || !returnDate) {
      alert("Please provide both issue and return dates.");
      return false;
    }

    const issue = new Date(issueDate);
    const returnD = new Date(returnDate);
    const today = new Date();


    today.setHours(0, 0, 0, 0);
    issue.setHours(0, 0, 0, 0);
    returnD.setHours(0, 0, 0, 0);


    if (isNaN(issue.getTime()) || isNaN(returnD.getTime())) {
      alert("Invalid date format. Please enter valid dates.");
      return false;
    }


    if (issue > today) {
      alert("Issue date cannot be in the future.");
      return false;
    }


    if (returnD <= issue) {
      alert("Return date must be after the issue date.");
      return false;
    }

    return true;
  }



}
