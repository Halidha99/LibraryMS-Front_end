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

  constructor(private http: HttpClient) {}

  public addMember() {
    if (!this.member.name || !this.member.address || !this.member.email) {
      alert('Please fill in all fields.');
      return;
    }

    this.http.post('http://localhost:8080/member/add-member', this.member).subscribe({
      next: () => {
        alert('Member Added!');
        this.resetForm();
      },
      error: (error) => {
        console.error('Error adding member:', error);
        alert('Failed to add member. Please try again.');
      }
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
