import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-members',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-members.component.html',
  styleUrls: ['./add-members.component.css']
})
export class AddMembersComponent {
  public member: any = {
    name: '',
    address: '',
    email: ''
  };

  public errorMessage: string = ''; 

  constructor(private http: HttpClient) {}

  public addMember() {
    this.errorMessage = '';

    if (!this.member.email || !this.member.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    if (!this.member.address || this.member.address.length < 5) {
      this.errorMessage = 'Please enter a valid address (at least 5 characters).';
      return;
    }


    this.http.post("http://localhost:8080/member/add-member", this.member)
      .subscribe(() => {
        alert("Member Added Successfully!");
        this.resetForm();
      }, (error) => {
        this.errorMessage = 'An error occurred while adding the member. Please try again.';
      });
  }


  private resetForm() {
    this.member = {
      name: '',
      address: '',
      email: ''
    };
  }
}
