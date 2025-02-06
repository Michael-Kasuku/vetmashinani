import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

export interface FarmerProfile {
  id: number;
  name: string;
  jobTitle: string;
  location: string;
  email: string;
  profilePicture: {
    fileContents: string;
    contentType: string;
  } | null; // Can be null if no picture is provided
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
  profileImage: string = '/img/vmashinani.png'; // Default profile image
  searchQuery: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router,
    private sanitizer: DomSanitizer // Inject DomSanitizer to sanitize the URL
  ) { }

  ngOnInit(): void {
    this.fetchPetOwners();
  }

  fetchPetOwners(): void {
    const url = `http://localhost:40443/api/account/getfarmers`;
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
    if (farmer.profilePicture && farmer.profilePicture.fileContents) {
      return `data:${farmer.profilePicture.contentType};base64,${farmer.profilePicture.fileContents}`;
    } else {
      return this.profileImage; // Default profile image
    }
  }

  onSearch(): void {
    this.filteredProfiles = this.farmerProfiles.filter(farmer =>
      farmer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  appointments(farmer: FarmerProfile): void {
    // Store the Farmer profile in local storage
    localStorage.setItem('farmer', JSON.stringify(farmer));
    this.router.navigate(['/vet/appointments']);
  }
}
