import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FarmerAuthService } from '../farmer-auth/farmer-auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface VetProfile {
  id: number;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  profilePicture: {
    fileContents: string;
    contentType: string;
  } | null;
}

@Component({
  selector: 'app-farmer-dashboard',
  standalone:false,
  templateUrl: './farmer-dashboard.component.html',
  styleUrl: './farmer-dashboard.component.scss'
})
export class FarmerDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroySubject = new Subject();
  isLoggedIn: boolean = false;
  profileImage: string = '/img/vetmashinani.png';  // Default profile image
  private email: string | null = localStorage.getItem('email');
  vetProfiles: VetProfile[] = [];
  displayedColumns: string[] = ['profile', 'name', 'jobTitle', 'location', 'actions'];
  dataSource = new MatTableDataSource<VetProfile>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: FarmerAuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.email) {
      this.loadProfileImage(this.email);
    }
    this.fetchVets();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  fetchVets(): void {
    const url = 'https://vetmashinani-001-site1.qtempurl.com/api/account/getvets';
    this.http.get<VetProfile[]>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.openSnackbar('Vet Profiles Loaded Successfully!', 'success');
      },
      error: () => {
        this.openSnackbar('Failed to load Vet Profiles!', 'error');
      },
    });
  }

  getProfileImageUrl(vet: VetProfile): string {
    return vet.profilePicture?.fileContents
      ? `data:${vet.profilePicture.contentType};base64,${vet.profilePicture.fileContents}`
      : '/img/vetmashinani.png';
  }

  appointments(vet: VetProfile): void {
    localStorage.setItem('vet', JSON.stringify(vet));
    this.router.navigate(['/farmer/appointments']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/farmer/login"]);
  }

  goToProfile(): void {
    this.router.navigate(['/farmer/myprofile']);
  }

  private loadProfileImage(email: string): void {
    const url = `https://vetmashinani-001-site1.qtempurl.com/api/account/getprofileimage?Email=${email}`;
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (response) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result as string;
        };
        reader.readAsDataURL(response);
        this.openSnackbar('Profile Picture Loaded Successfully!', 'success');
      },
      () => {
        this.openSnackbar('Error loading profile image.', 'error');
        this.profileImage = '/img/vetmashinani.png'; // Fallback to default image
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }
}
