import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, JsonPipe } from '@angular/common';
import { Issue } from '../../../core/models/issue.model';
import { IssueService } from '../../../core/services/issue.service';

@Component({
  selector: 'app-issue-detail',
  standalone: true,  
  imports: [CommonModule,JsonPipe],
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  issue?: Issue;

  constructor(private route: ActivatedRoute, private issueService: IssueService) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.issueService.getIssue(id).subscribe(issue => this.issue = issue);
  }
}
