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

  public bookList:any=[];

  constructor(private http: HttpClient) {
    this.loadTable();
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
      });
  }

  loadTable(){
    this.http.get("http://localhost:8080/book/get-book").subscribe((data=>{
      // console.log(data);
      this.bookList=data;
    }))
  }
  deleteBookById(id:any){
    console.log(id);
    this.http.delete(`http://localhost:8080/book/delete-by-id/${id}`).subscribe(data=>{
      alert("Book deleted !!!!");
      this.loadTable();
    })
  }
    public bookTemp:any={}
  updateBook(book:any){
    console.log(book);
    this.bookTemp=book;

  }
  saveBook(){
    this.http.put("http://localhost:8080/customer/update-book",this.bookTemp).subscribe(data=>{
      alert("Book Updated!!!!!")
    })
  }

}


