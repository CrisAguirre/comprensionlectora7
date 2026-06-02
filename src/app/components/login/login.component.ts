import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProgressService } from '../../services/progress.service';
import { ThemeService } from '../../services/theme.service';
import { UnitReflectionService } from '../../services/unit-reflection.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  error = '';
  isLoading = false;
  isLight = false;

  constructor(
    private authService: AuthService,
    private progressService: ProgressService,
    private reflectionService: UnitReflectionService,
    private themeService: ThemeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLight = this.themeService.isLight;
    this.authService.pingServer();
  }

  toggleTheme(): void {
    this.themeService.toggle();
    this.isLight = this.themeService.isLight;
  }

  onLogin(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    const cleanUsername = this.username.trim();
    const cleanPassword = this.password.trim();

    this.authService.login(cleanUsername, cleanPassword).subscribe(user => {
      if (user) {
        this.error = '';

        // ── 1. Cargar progreso del backend y fusionar con local ─────────────
        this.reflectionService.bindUser(user.userId);
        this.progressService.loadFromBackend(user.userId).subscribe(() => {
          this.router.navigate(['/intro']);
        });

      } else {
        this.isLoading = false;
        this.error = 'Credenciales incorrectas o el servidor tardó demasiado. Intente nuevamente.';
      }
    });
  }
}
