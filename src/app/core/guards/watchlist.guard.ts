import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AccessService } from '../services/access.service';

export const watchlistGuard: CanActivateFn = () => {
  const accessService = inject(AccessService);
  const router = inject(Router);

  if (accessService.canAccessWatchlist()) {
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};
