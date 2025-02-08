import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  selector: 'app-vet-farmer-profiles',
  standalone: false,
  templateUrl: './vet-farmer-profiles.component.html',
  styleUrl: './vet-farmer-profiles.component.scss'
})
export class VetFarmerProfilesComponent implements OnInit {
  farmerProfiles: FarmerProfile[] = [];
  filteredProfiles: FarmerProfile[] = [];
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchVets();
  }

  fetchVets(): void {
    const url = `https://localhost:40443/api/account/getfarmers`;
    this.http.get<FarmerProfile[]>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        this.farmerProfiles = data;
        this.filteredProfiles = data;
        this.openSnackbar('Farmer Profiles Loaded Successfully!', 'success');
      },
      error: () => {
        this.openSnackbar('Failed to load Farmer Profiles!', 'error');
      },
    });
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
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
}
