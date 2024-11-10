import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-top-widgets',
  standalone: true,
  imports: [FormsModule,HttpClientModule,CommonModule],
  templateUrl: './top-widgets.component.html',
  styleUrl: './top-widgets.component.css'
})
export class TopWidgetsComponent {
  public memberList: any = [];
  public memberCount: number = 0;

  public bookList:any=[];
  public bookCount:number=0;

  public bookIssues: any[] = [];
  public issuseBookCount:number=0;

  constructor(private http: HttpClient) {
    this.loadMembers();
    this.loadBooks();
    this.loadIssuedBooks();
  }

  loadMembers(){
    this.http.get("http://localhost:8080/member/get-member").subscribe((data=>{
      this.memberList=data;
      this.memberCount=this.memberList.length;
    }))
  }


  loadBooks() {
    this.http.get("http://localhost:8080/book/get-book").subscribe((data: any) => {
      this.bookList = data;
      this.bookCount=this.bookList.length;
    });
  }
  loadIssuedBooks(): void {
    this.http.get(`http://localhost:8080/borrow/get-borrow`).subscribe
      ((data: any) => {
        this.bookIssues = data;
        this.issuseBookCount=this.bookIssues.length;
      });
  }
}
