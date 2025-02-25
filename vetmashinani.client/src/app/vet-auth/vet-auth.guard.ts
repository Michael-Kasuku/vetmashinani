import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { VetAuthService } from './vet-auth.service';

export const VetAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: VetAuthService = inject(VetAuthService);
  const router: Router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access
  }

  // Redirect to the login page with a query parameter for the original URL
  router.navigate(['/vet/login'], {
    queryParams: { redirectTo: state.url },
  });

  return false; // Deny access
};
