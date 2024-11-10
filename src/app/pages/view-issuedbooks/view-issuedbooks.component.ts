import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IssuseBooksComponent } from '../../issuse-books/issuse-books.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-issuedbooks',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule,IssuseBooksComponent],
  templateUrl: './view-issuedbooks.component.html',
  styleUrl: './view-issuedbooks.component.css'
})
export class ViewIssuedbooksComponent {


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
