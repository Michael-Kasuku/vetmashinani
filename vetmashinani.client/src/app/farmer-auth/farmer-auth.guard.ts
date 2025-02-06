import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { FarmerAuthService } from './farmer-auth.service';

export const FarmerAuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService: FarmerAuthService = inject(FarmerAuthService);
  const router: Router = inject(Router);

  // Check if the user is authenticated
  if (authService.isAuthenticated()) {
    return true; // Allow access
  }

  // Redirect to the login page with a query parameter for the original URL
  router.navigate(['/farmer/login'], {
    queryParams: { redirectTo: state.url },
  });

  return false; // Deny access
};
