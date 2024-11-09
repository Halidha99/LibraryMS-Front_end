import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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

  public issuseBook: any = {
    id: '',
    memberId: '',
    issueDate: '',
    dueDate: ''
  };

  public bookList: any[] = [];
  public memberList: any[] = [];

  public isLoadingBooks: boolean = false;
  public isLoadingMembers: boolean = false;
  public errorMessage: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBooks();
    this.loadMembers();
  }

  // Load Data for Books and Members
  loadData(url: string, callback: (data: any[]) => void, loadingState: 'isLoadingBooks' | 'isLoadingMembers'): void {
    this[loadingState] = true;
    this.http.get<any[]>(url).subscribe(
      (data) => {
        callback(data);
        this[loadingState] = false;
      },
      (error) => {
        this[loadingState] = false;
        this.errorMessage = `Error loading data from ${url}. Please try again later.`;
        console.error('Error loading data:', error);
      }
    );
  }

  // Load Books
  loadBooks(): void {
    this.loadData('http://localhost:8080/book/get-book', (data) => {
      this.bookList = data;
    }, 'isLoadingBooks');
  }

  // Load Members
  loadMembers(): void {
    this.loadData('http://localhost:8080/member/get-member', (data) => {
      this.memberList = data;
    }, 'isLoadingMembers');
  }

  // Issue Book
  issueBook(): void {
    if (!this.issuseBook.id || !this.issuseBook.memberId || !this.issuseBook.issueDate || !this.issuseBook.dueDate) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

     console.log("Issuing Book:", this.issuseBook);

    this.http.post("http://localhost:8080/borrow/add-borrow", this.issueBook).subscribe((data=>{
      alert("Add Successfully");
    }))

    }


  resetForm(): void {
    this.issuseBook = { id: '', memberId: '', issueDate: '', dueDate: '' };
    this.errorMessage = '';
  }


}
