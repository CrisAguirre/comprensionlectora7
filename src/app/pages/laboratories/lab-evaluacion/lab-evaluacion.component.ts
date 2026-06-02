import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseActivity, CourseService } from '../../../services/course.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { ProgressService } from '../../../services/progress.service';
import { AuthService } from '../../../services/auth.service';
import { GamificationService } from '../../../services/gamification.service';

interface UiQuestion {
  id: number;
  text: string;
  options: string[];
  correct: number;
}

@Component({
  selector: 'app-lab-evaluacion',
  templateUrl: './lab-evaluacion.component.html',
  styleUrls: ['./lab-evaluacion.component.css', '../unit-shared.css']
})
export class LabEvaluacionComponent implements OnInit {
  unitId = 0;
  activity: CourseActivity | undefined;
  questions: UiQuestion[] = [];
  answers: Record<number, number> = {};
  submitted = false;
  score = 0;
  passPercentage = 70;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private evaluationService: EvaluationService,
    private progressService: ProgressService,
    private authService: AuthService,
    private gamification: GamificationService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.unitId = Number(params.get('id') || 0);
      this.submitted = false;
      this.answers = {};
      this.activity = this.courseService.getActivity(this.unitId);
      this.passPercentage = this.courseService.getPassPercentage();
      this.questions = (this.activity?.quizQuestions ?? []).map(q => ({
        id: q.id,
        text: q.prompt,
        options: q.options,
        correct: q.correctOptionIndex
      }));
    });
  }

  selectAnswer(questionId: number, optionIndex: number): void {
    if (this.submitted) return;
    this.answers[questionId] = optionIndex;
  }

  canSubmit(): boolean {
    return this.questions.length > 0 &&
      Object.keys(this.answers).length === this.questions.length;
  }

  getPercentage(): number {
    if (!this.questions.length) return 0;
    return Math.round((this.score / this.questions.length) * 100);
  }

  submitEvaluation(): void {
    if (!this.canSubmit() || !this.activity) return;

    this.score = this.questions.filter(q => this.answers[q.id] === q.correct).length;
    const pct = this.getPercentage();
    this.submitted = true;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    const labName = this.activity.title;
    const result = {
      userId: user.userId,
      username: user.displayName || user.username,
      labId: this.unitId,
      labName,
      score: this.score,
      totalQuestions: this.questions.length,
      percentage: pct,
      answers: this.answers
    };

    this.evaluationService.saveResult(result).subscribe({
      next: () => {
        if (pct >= this.passPercentage) {
          this.progressService.completeLab(
            this.unitId,
            user.userId,
            user.displayName || user.username,
            pct
          );
        }
        const totalCompleted = this.progressService.snapshot.labs.filter(l => l.status === 'completed').length;
        this.gamification.processEvaluationResult(this.unitId, pct, totalCompleted);
      },
      error: (err) => console.warn('[CL7] No se pudo guardar evaluación:', err)
    });
  }

  retryEvaluation(): void {
    this.answers = {};
    this.submitted = false;
    this.score = 0;
  }

  get externalEvaluations() {
    return (this.activity?.resources ?? []).filter(
      r => r.phase === 'cierre' && (r.type === 'evaluación' || r.type === 'forms' || r.type === 'educaplay' || r.type === 'padlet' || r.type === 'mentimeter')
    );
  }
}
