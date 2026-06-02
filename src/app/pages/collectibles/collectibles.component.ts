import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { EvaluationService } from '../../services/evaluation.service';
import { GamificationService } from '../../services/gamification.service';
import { ProgressService } from '../../services/progress.service';
import { environment } from '../../../environments/environment';

interface Collectible {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
  rarity: 'comun' | 'raro' | 'epico' | 'legendario';
  earnedAt?: string;
  labId: number;
}

interface DocenteCollectibles {
  userId: string;
  username: string;
  collectibles: Collectible[];
  earned: number;
}

const UNIT_COLLECTIBLES = [
  { id: 'u1', collectibleId: 'u1_ia',       labId: 1, name: 'Mente IA',          icon: '🧠', rarity: 'comun' as const,      description: 'Completaste la unidad de herramientas de IA.' },
  { id: 'u2', collectibleId: 'u2_prompt', labId: 2, name: 'Prompt Maestro',    icon: '✍️', rarity: 'comun' as const,      description: 'Completaste la unidad de diseño de prompts.' },
  { id: 'u3', collectibleId: 'u3_live',   labId: 3, name: 'Ficha Interactiva', icon: '🧩', rarity: 'comun' as const,      description: 'Completaste la unidad de Liveworksheets.' },
  { id: 'u4', collectibleId: 'u4_chocoano', labId: 4, name: 'Voz del Pacífico', icon: '📘', rarity: 'raro' as const,       description: 'Completaste la unidad de Canto Chocoano.' },
  { id: 'u5', collectibleId: 'u5_pixton', labId: 5, name: 'Historieta Viva',   icon: '💬', rarity: 'raro' as const,       description: 'Completaste la unidad de Pixton.' },
  { id: 'u6', collectibleId: 'u6_guernica', labId: 6, name: 'Línea del Tiempo', icon: '🕰️', rarity: 'epico' as const,     description: 'Completaste la unidad de La Guernica.' },
  { id: 'u7', collectibleId: 'u7_scratch', labId: 7, name: 'Quiz Digital',      icon: '🎮', rarity: 'epico' as const,      description: 'Completaste la unidad de Scratch.' },
  { id: 'u8', collectibleId: 'u8_story',  labId: 8, name: 'Narrador CL7',      icon: '🎬', rarity: 'legendario' as const, description: 'Completaste la unidad de Storytelling.' },
  { id: 'c7', collectibleId: 'puntaje_perfecto', labId: -1, name: 'Mente Brillante', icon: '💡', rarity: 'legendario' as const, description: 'Obtuviste 100% en una evaluación.' },
  { id: 'c8', collectibleId: 'coleccionista', labId: -2, name: 'Coleccionista', icon: '🌟', rarity: 'legendario' as const, description: 'Desbloqueaste todos los coleccionables de unidades.' },
];

@Component({
  selector: 'app-collectibles',
  templateUrl: './collectibles.component.html',
  styleUrls: ['./collectibles.component.css']
})
export class CollectiblesComponent implements OnInit, OnDestroy {
  isAdmin = false;
  myCollectibles: Collectible[] = [];
  docenteList: DocenteCollectibles[] = [];
  loading = true;
  private gamSub!: Subscription;

  constructor(
    private authService: AuthService,
    private evalService: EvaluationService,
    private gamification: GamificationService,
    private progressService: ProgressService,
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    if (this.isAdmin) {
      this.loadAdminView();
    } else {
      this.gamSub = this.gamification.collectibles$.subscribe(() => this.loadDocenteView());
      this.loadDocenteView();
    }
  }

  ngOnDestroy(): void { this.gamSub?.unsubscribe(); }

  private buildCollectibles(
    completedLabIds: number[],
    scores: { labId: number; percentage: number }[]
  ): Collectible[] {
    const gamEarned = this.gamification.earnedCollectibles;
    const unitIds = UNIT_COLLECTIBLES.filter(c => c.labId > 0).map(c => c.collectibleId);

    return UNIT_COLLECTIBLES.map(item => {
      let earned = false;
      if (item.labId > 0) {
        earned = completedLabIds.includes(item.labId)
          || gamEarned.some(g => g.collectibleId === item.collectibleId);
      } else if (item.labId === -1) {
        earned = scores.some(s => s.percentage === 100)
          || gamEarned.some(g => g.collectibleId === 'puntaje_perfecto');
      } else if (item.labId === -2) {
        const allUnits = unitIds.every(id => gamEarned.some(g => g.collectibleId === id))
          || completedLabIds.length >= 8;
        earned = allUnits || gamEarned.some(g => g.collectibleId === 'coleccionista');
      }
      return { ...item, earned };
    });
  }

  private loadDocenteView(): void {
    const user = this.authService.getCurrentUser()!;
    this.evalService.getResultsByUser(user.userId).subscribe({
      next: (results) => {
        const completedIds = [...new Set(results.filter(r => r.percentage >= 70).map(r => r.labId))];
        const scores = results.map(r => ({ labId: r.labId, percentage: r.percentage }));
        this.myCollectibles = this.buildCollectibles(completedIds, scores);
        this.loading = false;
      },
      error: () => {
        const progress = this.progressService.snapshot;
        const completedIds = progress.labs.filter(l => l.status === 'completed').map(l => l.id);
        this.myCollectibles = this.buildCollectibles(completedIds, []);
        this.loading = false;
      }
    });
  }

  private loadAdminView(): void {
    const registered = ((environment as any).users || [])
      .filter((u: any) => u.role === 'docente')
      .map((u: any) => ({ userId: u.userId, displayName: u.displayName }));

    this.evalService.getAllResults().subscribe({
      next: (results) => {
        const userMap = new Map<string, { username: string; scores: { labId: number; percentage: number }[] }>();
        registered.forEach((d: any) => userMap.set(d.userId, { username: d.displayName, scores: [] }));
        results.forEach(r => {
          if (!userMap.has(r.userId)) userMap.set(r.userId, { username: r.username, scores: [] });
          userMap.get(r.userId)!.scores.push({ labId: r.labId, percentage: r.percentage });
        });
        this.docenteList = Array.from(userMap.entries()).map(([userId, data]) => {
          const completedIds = [...new Set(data.scores.filter(s => s.percentage >= 70).map(s => s.labId))];
          const cols = this.buildCollectibles(completedIds, data.scores);
          return { userId, username: data.username, collectibles: cols, earned: cols.filter(c => c.earned).length };
        });
        this.loading = false;
      },
      error: () => {
        this.docenteList = registered.map((d: any) => ({
          userId: d.userId, username: d.displayName,
          collectibles: this.buildCollectibles([], []), earned: 0
        }));
        this.loading = false;
      }
    });
  }

  rarityLabel(r: string): string {
    return ({ comun: 'Común', raro: 'Raro', epico: 'Épico', legendario: 'Legendario' } as Record<string, string>)[r] ?? r;
  }

  get earnedCount(): number { return this.myCollectibles.filter(c => c.earned).length; }
}
