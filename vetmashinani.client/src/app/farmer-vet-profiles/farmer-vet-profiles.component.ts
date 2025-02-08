import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  selector: 'app-farmer-vet-profiles',
  standalone: false,
  templateUrl: './farmer-vet-profiles.component.html',
  styleUrl: './farmer-vet-profiles.component.scss'
})
export class FarmerVetProfilesComponent implements OnInit {
  vetProfiles: VetProfile[] = [];
  filteredProfiles: VetProfile[] = [];
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
    const url = `https://localhost:40443/api/account/getvets`;
    this.http.get<VetProfile[]>(url, { responseType: 'json' }).subscribe({
      next: (data) => {
        this.vetProfiles = data;
        this.filteredProfiles = data;
        this.openSnackbar('Vet Profiles Loaded Successfully!', 'success');
      },
      error: () => {
        this.openSnackbar('Failed to load Vet Profiles!', 'error');
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

  getProfileImageUrl(vet: VetProfile): string {
    return vet.profilePicture?.fileContents
      ? `data:${vet.profilePicture.contentType};base64,${vet.profilePicture.fileContents}`
      : '/img/vetmashinani.png';
  }

  appointments(vet: VetProfile): void {
    localStorage.setItem('vet', JSON.stringify(vet));
    this.router.navigate(['/farmer/appointments']);
  }
}
