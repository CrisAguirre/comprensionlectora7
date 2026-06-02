import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UnitReflectionService } from '../services/unit-reflection.service';

export const reflectionGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const reflection = inject(UnitReflectionService);
  const router = inject(Router);

  if (auth.isAdmin()) return true;

  const user = auth.getCurrentUser();
  const unitId = Number(route.parent?.paramMap.get('id'));
  if (user && reflection.isComplete(unitId, user.userId)) return true;

  return router.createUrlTree(['/laboratories', unitId, 'cierre'], {
    queryParams: { requiereReflexion: '1' }
  });
};
