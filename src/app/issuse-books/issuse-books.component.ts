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
    // this.loadData(`http://localhost:8080/member/get-member`, (data) => {
    //   this.memberList = data;
    // }, 'isLoadingMembers');
  }

  loadIssuedBooks(): void {
    this.http.get<any[]>(`http://localhost:8080/borrow/get-borrow`).subscribe(
      (data) => {
        this.bookIssues = data;
        this.resetForm();
      },

    );
  }

  public Add(): void {
    if (!this.issuseBook.id || !this.issuseBook.memberId || !this.issuseBook.issueDate || !this.issuseBook.returnDate) {
      alert("Please fill out all fields");
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


}
