import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CourseActivity, CourseService } from '../../../services/course.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { UnitReflectionService } from '../../../services/unit-reflection.service';

@Component({
  selector: 'app-lab-cierre',
  templateUrl: './lab-cierre.component.html',
  styleUrls: ['../unit-shared.css']
})
export class LabCierreComponent implements OnInit {
  unitId = 0;
  activity: CourseActivity | undefined;
  reflectionText = '';
  saved = false;
  saving = false;
  error: string | null = null;
  showRequiredBanner = false;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private evalService: EvaluationService,
    private authService: AuthService,
    private reflectionService: UnitReflectionService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.unitId = Number(params.get('id') || 0);
      this.activity = this.courseService.getActivity(this.unitId);
      this.loadExistingReflection();
    });
    this.route.queryParamMap.subscribe(q => {
      this.showRequiredBanner = q.get('requiereReflexion') === '1';
    });
  }

  saveReflection(): void {
    if (!this.reflectionText.trim() || !this.activity) return;
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.saving = true;
    this.error = null;
    this.evalService.saveConclusion({
      userId: user.userId,
      username: user.displayName || user.username,
      labId: this.unitId,
      labName: this.activity.title,
      conclusionText: this.reflectionText.trim(),
      scannedModels: []
    }).subscribe({
      next: () => {
        this.saved = true;
        this.saving = false;
        this.showRequiredBanner = false;
        this.reflectionService.markComplete(this.unitId, user.userId);
      },
      error: () => {
        this.error = 'No se pudo guardar la reflexión. Verifica la conexión con el servidor.';
        this.saving = false;
      }
    });
  }

  resetReflection(): void {
    const user = this.authService.getCurrentUser();
    this.reflectionText = '';
    this.saved = false;
    this.error = null;
    if (user) {
      this.reflectionService.clearComplete(this.unitId, user.userId);
    }
  }

  get closureResources() {
    return (this.activity?.resources ?? []).filter(r => r.phase === 'cierre' || r.phase === 'general');
  }

  private loadExistingReflection(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (this.reflectionService.isComplete(this.unitId, user.userId)) {
      this.saved = true;
    }

    this.evalService.getConclusionsByUser(user.userId).subscribe({
      next: list => {
        const row = list.find(c => c.labId === this.unitId && c.conclusionText?.trim());
        if (row) {
          this.reflectionText = row.conclusionText;
          this.saved = true;
          this.reflectionService.markComplete(this.unitId, user.userId);
        }
      },
      error: () => { /* usar estado local */ }
    });
  }
}
