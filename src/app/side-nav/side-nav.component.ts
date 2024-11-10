import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { faDashboard, faBook, faUsers, faBookOpenReader, faRotateLeft, faList, faBookOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  faDashboard = faDashboard;
  faBook = faBook;
  faUsers = faUsers;
  faBookOpenReader = faBookOpenReader;
  faRotateLeft = faRotateLeft;
  faList = faList;
  faBookOpen = faBookOpen;
  faSignOutAlt = faSignOutAlt;

  // constructor(private authService: AuthService, private router: Router) {}

  // onLogout(): void {
  //   this.authService.logout();  // Calls the logout function in your AuthService
  //   this.router.navigate(['/login']);

  // }
}
