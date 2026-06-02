import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProgressService } from '../../services/progress.service';
import { AuthService } from '../../services/auth.service';
import { CourseActivity, CourseService } from '../../services/course.service';

interface UnitCard {
  id: number;
  title: string;
  icon: string;
  description: string;
  unitLevel: string;
  status: string;
}

@Component({
  selector: 'app-laboratories',
  templateUrl: './laboratories.component.html',
  styleUrls: ['./laboratories.component.css']
})
export class LaboratoriesComponent implements OnInit, OnDestroy {
  units: UnitCard[] = [];
  private sub!: Subscription;

  constructor(
    private progressService: ProgressService,
    private router: Router,
    private authService: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.buildUnits();

    const isAdmin = this.authService.isAdmin();
    this.sub = this.progressService.progress$.subscribe(p => {
      this.units = this.units.map(unit => {
        if (isAdmin) return { ...unit, status: 'available' };
        const prog = p.labs.find(l => l.id === unit.id);
        return { ...unit, status: prog ? prog.status : 'locked' };
      });
    });
  }

  ngOnDestroy(): void { this.sub?.unsubscribe(); }

  private buildUnits(): void {
    this.units = this.courseService.snapshot.activities.map(a => ({
      id: a.activityId,
      title: a.title,
      icon: this.courseService.getActivityIcon(a.activityId),
      description: a.objective,
      unitLevel: this.courseService.getUnitLevelLabel(a.unit),
      status: 'locked'
    }));
  }

  enter(unit: UnitCard): void {
    if (this.isLocked(unit)) return;
    const user = this.authService.getCurrentUser();
    this.progressService.startLab(unit.id, user?.userId, user?.displayName);
    this.router.navigate(['/laboratories', unit.id, 'inicio']);
  }

  isLocked(unit: UnitCard): boolean {
    return !this.authService.isAdmin() && unit.status === 'locked';
  }

  btnLabel(status: string): string {
    const m: Record<string, string> = {
      available: '🚀 Comenzar unidad',
      'in-progress': '⚡ Continuar',
      completed: '🔁 Repetir',
      locked: '🔒 Bloqueada',
    };
    return m[status] ?? 'Ingresar';
  }
}
