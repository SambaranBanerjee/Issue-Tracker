import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssueListComponent } from './issue-list/issue-list.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';
import { IssueFormComponent } from './issue-form/issue-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IssuesRoutingModule,
    IssueListComponent,
    IssueDetailComponent,
    IssueFormComponent
  ],
  providers: [
    DatePipe,
    JsonPipe
  ]
})
export class IssuesModule {}
