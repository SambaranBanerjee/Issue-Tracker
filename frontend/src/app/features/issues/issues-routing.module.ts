import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueFormComponent } from './issue-form/issue-form.component';

const routes: Routes = [
  { path: '', component: IssueListComponent },
  { path: 'create', component: IssueFormComponent },
  { path: ':id', component: IssueDetailComponent },
  { path: ':id/edit', component: IssueFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule {}
