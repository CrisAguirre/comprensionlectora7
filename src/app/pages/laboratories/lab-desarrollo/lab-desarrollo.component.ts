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
  selector: 'app-lab-desarrollo',
  templateUrl: './lab-desarrollo.component.html',
  styleUrls: ['../unit-shared.css', './lab-desarrollo.component.css']
})
export class LabDesarrolloComponent implements OnInit {
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
      this.heroImage = this.courseService.getUnitHeroImages(this.unitId).desarrollo;
      this.unitIcon = this.courseService.getActivityIcon(this.unitId);
      this.bannerParticles = UNIT_PARTICLES[this.unitId] ?? ['📖', '✨', '🌟', '💡'];
    });
  }

  get developmentResources() {
    return (this.activity?.resources ?? []).filter(r => r.phase === 'desarrollo' || r.phase === 'general');
  }
}
