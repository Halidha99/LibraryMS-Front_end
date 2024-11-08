import { Routes } from '@angular/router';
import { BooksComponent } from './pages/books/books.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { AddMembersComponent } from './pages/add-members/add-members.component';
import { ManageMembersComponent } from './pages/manage-members/manage-members.component';
import { ReturnBookComponent } from './pages/return-book/return-book.component';

export const routes: Routes = [

  { path: 'dashboard', component:MainComponent },
  { path: 'books', component: BooksComponent },
  { path: 'add-members', component: AddMembersComponent},
  {path:'manage-members',component:ManageMembersComponent},
  // { path: 'issue-books', component: IssueBooksComponent },
  { path: 'return-books', component: ReturnBookComponent},
  // { path: 'view-records', component: ViewRecordsComponent },
  // { path: 'view-issued-books', component: ViewIssuedBooksComponent },
  // { path: 'logout', component: LogoutComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }

];
