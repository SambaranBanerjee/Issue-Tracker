import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common'; 
import { Router } from '@angular/router'; 
import { IssueService } from '../../../core/services/issue.service';
import { Issue } from '../../../core/models/issue.model';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  total = 0;

  query = {
    page: 1,
    pageSize: 10,
    search: '',
    status: '',
    priority: '',
    assignee: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  };

  statusOptions = ['', 'open', 'in progress', 'closed'];
  priorityOptions = ['', 'low', 'medium', 'high'];
  
  private searchSubject = new Subject<string>();

  constructor(
    private issueService: IssueService,
    private router: Router
  ) {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.query.search = searchTerm;
      this.query.page = 1;
      this.loadIssues();
    });
  }

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues() {
    this.issueService.getIssues(this.query).subscribe({
      next: (res) => {
        this.issues = res.data;
        this.total = res.total;
        console.log('Issues loaded:', this.issues);
      },
      error: (error) => {
        console.error('Error loading issues:', error);
      }
    });
  }

  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchSubject.next(term);
  }

  onFilterChange() {
    this.query.page = 1;
    this.loadIssues();
  }

  onSort(field: string) {
    if (this.query.sortBy === field) {
      this.query.sortOrder = this.query.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.query.sortBy = field;
      this.query.sortOrder = 'desc';
    }
    this.loadIssues();
  }

  onPageChange(page: number) {
    this.query.page = page;
    this.loadIssues();
  }

  onPageSizeChange(size: number) {
    this.query.pageSize = size;
    this.query.page = 1;
    this.loadIssues();
  }

  viewIssue(id: string) {
    this.router.navigate(['/issues', id]);
  }

  editIssue(event: Event, id: string) {
    event.stopPropagation();
    this.router.navigate(['/issues', id, 'edit']);
  }

  createIssue() {
    this.router.navigate(['/issues/create']);
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.total / this.query.pageSize);
    const pages: number[] = [];
    
    let startPage = Math.max(1, this.query.page - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}