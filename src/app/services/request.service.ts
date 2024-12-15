import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { LoadState } from '../interfaces/load-state';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private http = inject(HttpClient);

  loadState$ = new BehaviorSubject<LoadState>('idle');

  private apiEntry = environment.apiUrl;

  constructor() {}

  get<T>(url: string) {
    this.loadState$.next('loading');
    return this.http.get<T>(`${this.apiEntry}/${url}`).pipe(
      tap(() => {
        this.loadState$.next('idle');
      })
    );
  }

  post<T>(url: string, body: any) {
    this.loadState$.next('loading');
    return this.http.post<T>(`${this.apiEntry}/${url}`, body).pipe(
      tap(() => {
        this.loadState$.next('idle');
      })
    );
  }

  put<T>(url: string, body: any) {
    this.loadState$.next('loading');
    return this.http.put<T>(`${this.apiEntry}/${url}`, body).pipe(
      tap(() => {
        this.loadState$.next('idle');
      })
    );
  }

  delete<T>(url: string) {
    this.loadState$.next('loading');
    return this.http.delete<T>(`${this.apiEntry}/${url}`).pipe(
      tap(() => {
        this.loadState$.next('idle');
      })
    );
  }
}
