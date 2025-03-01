import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { VetAuthService } from '../vet-auth/vet-auth.service';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface FarmerProfile {
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
  selector: 'app-vet-dashboard',
  standalone:false,
  templateUrl: './vet-dashboard.component.html',
  styleUrl: './vet-dashboard.component.scss'
})
export class VetDashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroySubject = new Subject();
  isLoggedIn: boolean = false;
  profileImage: string = '/img/vetmashinani.png';  // Default profile image
  private email: string | null = localStorage.getItem('email');
  farmerProfiles: FarmerProfile[] = [];
  displayedColumns: string[] = ['profile', 'name', 'jobTitle', 'location', 'actions'];
  dataSource = new MatTableDataSource<FarmerProfile>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private authService: VetAuthService,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.email) {
      this.loadProfileImage(this.email);
    }
    this.fetchFarmers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.destroySubject.next(true);
    this.destroySubject.complete();
  }

  fetchFarmers(): void {
    const url = 'https://vetmashinani-001-site1.qtempurl.com/api/account/getfarmers';
    this.http.get<FarmerProfile[]>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.openSnackbar('Farmer Profiles Loaded Successfully!', 'success');
      },
      error: () => {
        this.openSnackbar('Failed to load Farmer Profiles!', 'error');
      },
    });
  }

  getProfileImageUrl(farmer: FarmerProfile): string {
    return farmer.profilePicture?.fileContents
      ? `data:${farmer.profilePicture.contentType};base64,${farmer.profilePicture.fileContents}`
      : '/img/vetmashinani.png';
  }

  appointments(farmer: FarmerProfile): void {
    localStorage.setItem('farmer', JSON.stringify(farmer));
    this.router.navigate(['/vet/appointments']);
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(["/vet/login"]);
  }

  goToProfile(): void {
    this.router.navigate(['/vet/myprofile']);
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
