import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CourseService } from '../../../services/course.service';
import { AuthService } from '../../../services/auth.service';
import { UnitReflectionService } from '../../../services/unit-reflection.service';

@Component({
  selector: 'app-lab-layout',
  templateUrl: './lab-layout.component.html',
  styleUrls: ['./lab-layout.component.css']
})
export class LabLayoutComponent implements OnInit, OnDestroy {
  unitId: string | null = null;
  unitTitle = 'Unidad';
  evalLocked = true;
  showEvalHint = false;

  private subs = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private authService: AuthService,
    private reflectionService: UnitReflectionService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap.subscribe(params => {
        this.unitId = params.get('id');
        this.refreshTitle();
        this.updateEvalLock();
      })
    );
    this.subs.add(
      this.reflectionService.status$.subscribe(() => this.updateEvalLock())
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onEvalLockedClick(): void {
    this.showEvalHint = true;
    setTimeout(() => { this.showEvalHint = false; }, 5000);
  }

  private refreshTitle(): void {
    const id = Number(this.unitId);
    const activity = this.courseService.getActivity(id);
    this.unitTitle = activity?.title ?? `Unidad ${this.unitId}`;
  }

  private updateEvalLock(): void {
    if (this.authService.isAdmin()) {
      this.evalLocked = false;
      return;
    }
    const uid = Number(this.unitId);
    this.evalLocked = !this.reflectionService.isComplete(uid);
  }
}
