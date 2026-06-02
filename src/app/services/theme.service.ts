import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'dark' | 'light';

const STORAGE_KEY = 'cl7_theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private _theme$ = new BehaviorSubject<ThemeMode>(this.readStored());
  readonly theme$ = this._theme$.asObservable();

  constructor() {
    this.apply(this._theme$.getValue());
  }

  get current(): ThemeMode {
    return this._theme$.getValue();
  }

  get isLight(): boolean {
    return this.current === 'light';
  }

  toggle(): void {
    this.setTheme(this.current === 'dark' ? 'light' : 'dark');
  }

  setTheme(theme: ThemeMode): void {
    this._theme$.next(theme);
    this.apply(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch { /* ignore */ }
  }

  private readStored(): ThemeMode {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  }

  private apply(theme: ThemeMode): void {
    document.documentElement.setAttribute('data-theme', theme);
  }
}
