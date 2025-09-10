import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueService } from '../../../core/services/issue.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './issue-form.component.html'
})
export class IssueFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      status: ['open'],
      priority: ['medium'],
      assignee: ['']
    });

    if (this.route.snapshot.paramMap.get('id')) {
      this.isEdit = true;
      this.id = Number(this.route.snapshot.paramMap.get('id'));
      this.issueService.getIssue(String(this.id)).subscribe(issue => this.form.patchValue(issue));
    }
  }

  onSubmit() {
    if (this.isEdit && this.id) {
      this.issueService.updateIssue(String(this.id), this.form.value).subscribe(() => {
        this.router.navigate(['/issues']);
      });
    } else {
      this.issueService.createIssue(this.form.value).subscribe(() => {
        this.router.navigate(['/issues']);
      });
    }
  }
}
