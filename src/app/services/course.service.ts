import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  CL7_COURSE,
  Course,
  CourseActivity
} from '../data/course-content';

export type {
  Course,
  CourseActivity,
  CourseResource,
  QuizQuestion
} from '../data/course-content';

export { CL7_COURSE } from '../data/course-content';

const UNIT_ICONS: Record<number, string> = {
  1: '🧠', 2: '✍️', 3: '🧩', 4: '📘', 5: '💬', 6: '🕰️', 7: '🎮', 8: '🎬'
};

const UNIT_LABELS: Record<string, string> = {
  semantico: 'Nivel semántico',
  sintactico: 'Nivel sintáctico',
  pragmatico: 'Nivel pragmático'
};

export interface UnitHeroImages {
  inicio: string | null;
  desarrollo: string | null;
}

const UNIT_HERO_IMAGES: Record<number, UnitHeroImages> = {
  1: {
    inicio: 'assets/images/labs/unit1_inicio.png',
    desarrollo: 'assets/images/labs/unit1_desarrollo.png'
  },
  2: {
    inicio: 'assets/images/labs/unit2_inicio.png',
    desarrollo: 'assets/images/labs/unit2_desarrollo.png'
  },
  3: {
    inicio: 'assets/images/labs/unit3_inicio.png',
    desarrollo: 'assets/images/labs/unit3_desarrollo.png'
  },
  4: {
    inicio: 'assets/images/labs/unit4_inicio.png',
    desarrollo: 'assets/images/labs/unit4_desarrollo.png'
  },
  5: { 
    inicio: 'assets/images/labs/unit5_inicio.png', 
    desarrollo: 'assets/images/labs/unit5_desarrollo.png' 
  },
  6: { 
    inicio: 'assets/images/labs/unit6_inicio.png', 
    desarrollo: 'css:timeline' 
  },
  7: { 
    inicio: 'css:scratch', 
    desarrollo: 'css:game' 
  },
  8: { 
    inicio: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', 
    desarrollo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80' 
  }
};

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly course: Course = CL7_COURSE;

  loadCourse(): Observable<Course> {
    return of(this.course);
  }

  get snapshot(): Course {
    return this.course;
  }

  getActivity(id: number): CourseActivity | undefined {
    return this.course.activities.find(a => a.activityId === id);
  }

  getActivityIcon(id: number): string {
    return UNIT_ICONS[id] ?? '📖';
  }

  getUnitLevelLabel(unit: string): string {
    return UNIT_LABELS[unit] ?? unit;
  }

  getUnitHeroImages(id: number): UnitHeroImages {
    return UNIT_HERO_IMAGES[id] ?? { inicio: null, desarrollo: null };
  }

  getPassPercentage(): number {
    return this.course.passPercentage;
  }
}
