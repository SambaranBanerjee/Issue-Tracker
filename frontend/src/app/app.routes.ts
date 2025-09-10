import { Routes } from '@angular/router';
import { IssueListComponent } from './features/issues/issue-list/issue-list.component';
import { IssueDetailComponent } from './features/issues/issue-detail/issue-detail.component';
import { IssueFormComponent } from './features/issues/issue-form/issue-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/issues', pathMatch: 'full' },
  { path: 'issues', component: IssueListComponent },
  { path: 'issues/create', component: IssueFormComponent },
  { path: 'issues/:id', component: IssueDetailComponent },
  { path: 'issues/:id/edit', component: IssueFormComponent }
];