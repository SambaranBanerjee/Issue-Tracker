import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Issue } from '../models/issue.model';

@Injectable({ providedIn: 'root' })
export class IssueService {
  private apiUrl = 'http://localhost:5000'; // backend URL

  constructor(private http: HttpClient) {}

  getIssues(query: any = {}): Observable<{ data: Issue[]; total: number }> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      if (query[key] !== null && query[key] !== undefined && query[key] !== '') {
        params = params.set(key, query[key]);
      }
    });
    
    return this.http.get<any>(`${this.apiUrl}/issues`, { params }).pipe(
      map(response => ({
        data: response.issues || [],
        total: response.total || 0
      }))
    );
  }

  getIssue(id: string): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/issues/${id}`);
  }

  createIssue(issue: Partial<Issue>): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/issues`, issue);
  }

  updateIssue(id: string, issue: Partial<Issue>): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/issues/${id}`, issue);
  }
}