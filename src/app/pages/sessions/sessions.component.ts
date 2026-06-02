import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressService, UserProgress } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';
import { CourseService } from '../../services/course.service';

interface UnitCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  xp: number;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  completedAt?: string | null;
}

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit, OnDestroy {
  units: UnitCard[] = [];
  userProgress!: UserProgress;
  globalPercent = 0;
  totalXP = 0;
  level = 1;
  completedCount = 0;
  private sub!: Subscription;

  constructor(
    private progressService: ProgressService,
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.units = this.courseService.snapshot.activities.map(a => ({
      id: a.activityId,
      title: a.title,
      icon: this.courseService.getActivityIcon(a.activityId),
      xp: 100,
      description: a.objective,
      status: 'locked' as const
    }));

    this.sub = this.progressService.progress$.subscribe(p => {
      this.userProgress = p;
      this.globalPercent = this.progressService.globalPercent;
      this.totalXP = p.totalXP;
      this.level = p.level;
      this.completedCount = p.labs.filter(l => l.status === 'completed').length;
      if (this.units.length) {
        this.units = this.units.map(u => {
          const lab = p.labs.find(l => l.id === u.id);
          return lab ? { ...u, status: lab.status as UnitCard['status'], completedAt: lab.completedAt } : u;
        });
      }
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  goToUnit(id: number): void {
    if (!this.progressService.isAvailable(id)) return;
    const user = this.authService.getCurrentUser();
    this.progressService.startLab(id, user?.userId, user?.displayName);
    this.router.navigate(['/laboratories', id, 'inicio']);
  }

  getLevelName(level: number): string {
    const names = ['', 'Lector inicial', 'Explorador', 'Analista', 'Interprete', 'Lector experto', 'Maestro lector', 'Leyenda CL7', 'Graduado CL7'];
    return names[Math.min(level, names.length - 1)];
  }

  getLevelAvatar(level: number): string {
    const avatars = ['', '📖', '📝', '🔍', '💬', '🎓', '🏆', '⭐', '🎖️'];
    return avatars[Math.min(level, avatars.length - 1)];
  }

  xpToNextLevel(): number { return (this.level * 300) - this.totalXP; }
  xpLevelPercent(): number {
    const xpInLevel = this.totalXP - ((this.level - 1) * 300);
    return Math.min(100, Math.round((xpInLevel / 300) * 100));
  }

  statusIcon(status: string): string {
    return ({ locked: '🔒', available: '🚀', 'in-progress': '⚡', completed: '✅' } as Record<string, string>)[status] ?? '';
  }

  statusLabel(status: string): string {
    return ({ locked: 'Bloqueada', available: 'Disponible', 'in-progress': 'En progreso', completed: 'Completada' } as Record<string, string>)[status] ?? status;
  }

  resetProgress(): void {
    if (!confirm('¿Reiniciar todo tu progreso? Esta acción no se puede deshacer.')) return;
    const user = this.authService.getCurrentUser();
    this.progressService.resetProgress(user?.userId);
  }
}
