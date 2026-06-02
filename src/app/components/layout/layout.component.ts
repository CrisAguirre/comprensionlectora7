import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AppUser } from '../../services/auth.service';
import { ProgressService } from '../../services/progress.service';
import { ThemeService } from '../../services/theme.service';
import { UnitReflectionService } from '../../services/unit-reflection.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  currentUser: AppUser | null = null;
  isAdmin = false;
  isLight = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private progressService: ProgressService,
    private themeService: ThemeService,
    private reflectionService: UnitReflectionService
  ) {}

  ngOnInit(): void {
    this.isLight = this.themeService.isLight;
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();

    if (this.currentUser) {
      this.reflectionService.bindUser(this.currentUser.userId);
    }

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    /**
     * FIX EXTRA: Si el usuario ya está logueado (p.ej. recargó la página sin
     * cerrar sesión), sincronizar el progreso desde el backend para detectar
     * actualizaciones o reparar inconsistencias. El merge en loadFromBackend
     * garantiza que el estado local más avanzado siempre se preserve.
     */
    if (this.currentUser.role === 'docente') {
      this.progressService.loadFromBackend(this.currentUser.userId)
        .pipe(catchError(() => of(null)))
        .subscribe();
    }
  }

  toggleTheme(): void {
    this.themeService.toggle();
    this.isLight = this.themeService.isLight;
  }

  logout() {
    this.progressService.clearSession();
    this.reflectionService.bindUser(null);
    this.authService.logout();
  }
}
