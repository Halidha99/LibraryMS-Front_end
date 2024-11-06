import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-members.component.html',
  styleUrl: './manage-members.component.css'
})
export class ManageMembersComponent {
  public memberList:any=[];

  constructor(private http:HttpClient){
    this.loadTable();
  }
  loadTable(){
    this.http.get("http://localhost:8080/member/get-member").subscribe((data=>{
      this.memberList=data;
    }))
  }
  deleteMemberById(id:any){
    console.log(id);
    this.http.delete(`http://localhost:8080/member/delete-by-id/${id}`).subscribe(data=>{
      alert("Member deleted !!!!");
      this.loadTable();
    })
  }
    public memberTemp:any={}
  updateMember(member:any){
    console.log(member);
    this.memberTemp=member;

  }
  saveMember(){
    this.http.put("http://localhost:8080/member/update-member",this.memberTemp).subscribe(data=>{
      alert("Member  Updated!!!!!")
    })
  }

}
