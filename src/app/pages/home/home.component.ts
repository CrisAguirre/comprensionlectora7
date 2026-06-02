import { Component, OnInit } from '@angular/core';
import { CourseActivity, CourseService } from '../../services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  units: CourseActivity[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.units = this.courseService.snapshot.activities;
  }

  unitIcon(id: number): string {
    return this.courseService.getActivityIcon(id);
  }

  unitLevel(unit: string): string {
    return this.courseService.getUnitLevelLabel(unit);
  }
}
