import { Component, OnInit } from '@angular/core';
import { EvaluationService, EvaluationResult, SubmissionResult, ConclusionResult } from '../../services/evaluation.service';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  results: EvaluationResult[] = [];
  submissions: SubmissionResult[] = [];
  conclusions: ConclusionResult[] = [];
  textContributions: any[] = [];
  stats: any[] = [];
  loading = true;
  loadingTexts = true;
  isAdmin = false;
  activeTab: 'evaluations' | 'texts' = 'evaluations';

  constructor(private evalService: EvaluationService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.loadingTexts = true;
    const user = this.authService.getCurrentUser();

    if (this.isAdmin) {
      this.evalService.getAllResults().subscribe({
        next: (data) => { this.results = data; this.loading = false; },
        error: () => { this.loading = false; }
      });
      this.evalService.getStats().subscribe({
        next: (data) => { this.stats = data; },
        error: (err) => console.error('Error stats:', err)
      });
      
      forkJoin({
        subs: this.evalService.getAllSubmissions(),
        concs: this.evalService.getAllConclusions()
      }).subscribe({
        next: (data) => {
          this.processTextContributions(data.subs, data.concs);
          this.loadingTexts = false;
        },
        error: () => { this.loadingTexts = false; }
      });
    } else {
      // Docente: only their own results
      if (user) {
        this.evalService.getResultsByUser(user.userId).subscribe({
          next: (data) => { this.results = data; this.loading = false; },
          error: () => { this.loading = false; }
        });
        
        forkJoin({
          subs: this.evalService.getSubmissionsByUser(user.userId),
          concs: this.evalService.getConclusionsByUser(user.userId)
        }).subscribe({
          next: (data) => {
            this.processTextContributions(data.subs, data.concs);
            this.loadingTexts = false;
          },
          error: () => { this.loadingTexts = false; }
        });
      }
    }
  }

  processTextContributions(submissions: SubmissionResult[], conclusions: ConclusionResult[]): void {
    const formattedSubs = submissions.filter(s => s.type === 'text').map(s => ({
      ...s,
      source: 'Misión ' + s.activityId + ' - Fase: ' + s.phase,
      date: s.createdAt,
      text: s.content
    }));
    
    const formattedConcs = conclusions.map(c => ({
      ...c,
      source: 'Conclusión: ' + c.labName,
      date: c.createdAt,
      text: c.conclusionText
    }));

    this.textContributions = [...formattedSubs, ...formattedConcs].sort((a, b) => {
      return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
    });
  }

  formatDate(dateString?: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
