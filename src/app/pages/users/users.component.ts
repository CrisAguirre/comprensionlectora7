import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

export interface UserRow {
  userId: string;
  displayName: string;
  username: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  docentes: UserRow[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    const token = this.authService.getCurrentUser()?.token;
    const request$ = token
      ? this.http.get<UserRow[]>(`${environment.apiUrl}/auth/users`, { headers: { Authorization: `Bearer ${token}` } })
      : this.http.get<UserRow[]>(`${environment.apiUrl}/auth/users`);

    request$.subscribe({
      next: (users) => {
        this.docentes = users.map((u: UserRow) => ({
          userId: u.userId,
          displayName: u.displayName,
          username: u.username,
          role: u.role,
          status: 'Activo'
        }));
      },
      error: () => {
        this.docentes = [];
      }
    });
  }
}
