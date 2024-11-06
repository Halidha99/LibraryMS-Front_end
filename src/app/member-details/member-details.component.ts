import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Aos from 'aos';

@Component({
  selector: 'app-member-details',
  standalone: true,
  imports: [CommonModule,MemberDetailsComponent,HttpClientModule],
  templateUrl: './member-details.component.html',
  styleUrl: './member-details.component.css'
})
export class MemberDetailsComponent implements OnInit {
  ngOnInit() {
    Aos.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: true
    });
  }
  public memberList:any=[];

  constructor(private http:HttpClient){
    this.loadTable();
  }
  loadTable(){
    this.http.get("http://localhost:8080/member/get-member").subscribe((data=>{
      this.memberList=data;
    }))
  }

}
