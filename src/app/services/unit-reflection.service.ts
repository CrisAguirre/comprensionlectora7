import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/** Reflexión obligatoria en Cierre antes de desbloquear Evaluación (por usuario y unidad). */
@Injectable({ providedIn: 'root' })
export class UnitReflectionService {
  private _userId: string | null = null;
  private _map$ = new BehaviorSubject<Record<number, boolean>>({});

  readonly status$ = this._map$.asObservable();

  bindUser(userId: string | null): void {
    this._userId = userId;
    this._map$.next(userId ? this.load(userId) : {});
  }

  isComplete(unitId: number, userId?: string | null): boolean {
    const uid = userId ?? this._userId;
    if (!uid) return false;
    return !!this.load(uid)[unitId];
  }

  markComplete(unitId: number, userId?: string | null): void {
    const uid = userId ?? this._userId;
    if (!uid) return;
    const map = { ...this.load(uid), [unitId]: true };
    this.save(uid, map);
    this._map$.next(map);
  }

  clearComplete(unitId: number, userId?: string | null): void {
    const uid = userId ?? this._userId;
    if (!uid) return;
    const map = { ...this.load(uid) };
    delete map[unitId];
    this.save(uid, map);
    this._map$.next(map);
  }

  private storageKey(userId: string): string {
    return `cl7_reflection_${userId}`;
  }

  private load(userId: string): Record<number, boolean> {
    try {
      const raw = localStorage.getItem(this.storageKey(userId));
      if (!raw) return {};
      const parsed = JSON.parse(raw) as Record<string, boolean>;
      const out: Record<number, boolean> = {};
      Object.keys(parsed).forEach(k => {
        out[Number(k)] = !!parsed[k];
      });
      return out;
    } catch {
      return {};
    }
  }

  private save(userId: string, map: Record<number, boolean>): void {
    try {
      localStorage.setItem(this.storageKey(userId), JSON.stringify(map));
    } catch { /* ignore */ }
  }
}
