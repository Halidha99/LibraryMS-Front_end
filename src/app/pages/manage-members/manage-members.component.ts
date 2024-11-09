import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-members',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.css']
})
export class ManageMembersComponent {
  public memberList: any = [];
  public filteredmemberList: any = [];
  public searchTerm: string = '';
  public memberTemp: any = {};

  constructor(private http: HttpClient) {
    this.loadMembers();
  }

  loadMembers() {
    this.http.get("http://localhost:8080/member/get-member").subscribe((data: any) => {
      this.memberList = data;
      this.filteredmemberList = data;
    });
  }

  deleteMemberById(id: any) {
    this.http.delete(`http://localhost:8080/member/delete-by-id/${id}`).subscribe(() => {
      alert("Member deleted!");
      this.loadMembers();
    });
  }

  updateMember(member: any) {
    this.memberTemp = { ...member };
  }

  saveMember() {
    this.http.put("http://localhost:8080/member/update-member", this.memberTemp).subscribe(() => {
      alert("Member updated!");
      this.loadMembers();
    });
  }

  searchMembers() {
    if (this.searchTerm) {
      this.filteredmemberList = this.memberList.filter((member: { name: string; }) =>
        member.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredmemberList = this.memberList;
    }
  }
}
