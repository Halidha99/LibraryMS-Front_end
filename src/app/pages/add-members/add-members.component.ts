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
    if (!this.isValidName(this.member.name)) {
      alert("Please enter a valid name (only alphabets and spaces allowed");
      this.resetForm();
      return;

    }

    if (!this.member.email || !this.member.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      this.resetForm();
      return;

    }

    if (!this.member.address || this.member.address.length < 5) {
      this.errorMessage = 'Please enter a valid address (at least 5 characters).';
      this.resetForm();
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
  private isValidName(name: string): boolean {
    if (name.length < 3) {
      return false;
    }
    for (let i = 0; i < name.length; i++) {
      const char = name.charAt(i);

      if (!((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z') || char === ' ')) {
        return false;
      }
    }
    return true;
  }


  private resetForm() {
    this.member = {
      name: '',
      address: '',
      email: ''
    };
  }
}
