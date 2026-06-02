import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseActivity, CourseService } from '../../../services/course.service';

/** Emoji particles per unit for the decorative fallback banner */
const UNIT_PARTICLES: Record<number, string[]> = {
  1: ['🧠', '🤖', '💡', '⚡', '🔬', '💻', '✨', '🌐'],
  2: ['✍️', '💬', '🎨', '📝', '🖌️', '💡', '📊', '🔮'],
  3: ['🧩', '📋', '✅', '🖥️', '⌨️', '🖱️', '📐', '🎯'],
  4: ['📘', '🌿', '🎭', '🌊', '⚡', '🏡', '🐦', '🎶'],
  5: ['💬', '🎨', '💭', '📖', '🖼️', '✏️', '⚡', '🌊'],
  6: ['🕰️', '🎨', '🖼️', '✈️', '🏛️', '📜', '🕊️', '🌍'],
  7: ['🎮', '🧩', '🎲', '🐟', '💻', '🏆', '🎯', '⚙️'],
  8: ['🎬', '📖', '🎭', '✨', '🎤', '📹', '🌟', '💫']
};

@Component({
  selector: 'app-lab-inicio',
  templateUrl: './lab-inicio.component.html',
  styleUrls: ['../unit-shared.css', './lab-inicio.component.css']
})
export class LabInicioComponent implements OnInit {
  unitId = 0;
  activity: CourseActivity | undefined;
  heroImage: string | null = null;
  unitIcon = '📖';
  bannerParticles: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.unitId = Number(params.get('id') || 0);
      this.activity = this.courseService.getActivity(this.unitId);
      this.heroImage = this.courseService.getUnitHeroImages(this.unitId).inicio;
      this.unitIcon = this.courseService.getActivityIcon(this.unitId);
      this.bannerParticles = UNIT_PARTICLES[this.unitId] ?? ['📖', '✨', '🌟', '💡'];
    });
  }

  unitLevelLabel(): string {
    return this.activity ? this.courseService.getUnitLevelLabel(this.activity.unit) : '';
  }

  get startResources() {
    return (this.activity?.resources ?? []).filter(r => r.phase === 'inicio' || r.phase === 'general');
  }
}
