import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { VetAuthService } from '../vet-auth/vet-auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vet-dashboard',
  standalone: false,
  
  templateUrl: './vet-dashboard.component.html',
  styleUrl: './vet-dashboard.component.scss'
})
export class VetDashboardComponent implements OnInit, OnDestroy {
  private destroySubject = new Subject();
  isLoggedIn: boolean = false;
  activeTab: number = 0;  // Default to the first tab
  profileImage: string = '/img/vetmashinani.png';  // Default profile image
  private email: string | null = localStorage.getItem('email');

  constructor(private authService: VetAuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.email) {
      this.loadProfileImage(this.email);
    }
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/vet/login"]);
  }

  goToProfile(): void {
    this.router.navigate(['/vet/myprofile']);
  }

  private loadProfileImage(email: string): void {
    const url = `https://localhost:40443/api/account/getprofileimage?Email=${email}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result as string;
        };
        reader.readAsDataURL(response);
        this.openSnackbar('Profile Picture Loaded Successfully!', 'success');
      },
      (error) => {
        let errorMessage = 'Error loading profile image.';
        if (error.error instanceof Blob && error.error.type === 'application/json') {
          const reader = new FileReader();
          reader.onload = () => {
            const errorData = JSON.parse(reader.result as string);
            errorMessage = errorData.message || errorMessage; // Ensure errorData.message exists
            this.openSnackbar(errorMessage, 'error');
          };
          reader.readAsText(error.error);
        } else {
          this.openSnackbar(errorMessage, 'error');
        }
        this.profileImage = '/img/vmashinani.png'; // Fallback to default image
      }
    );
  }



  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
