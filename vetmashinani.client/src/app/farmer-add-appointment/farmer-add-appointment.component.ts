import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VetProfile } from '../farmer-vet-profiles/farmer-vet-profiles.component';

@Component({
  selector: 'app-farmer-add-appointment',
  standalone: false,
  
  templateUrl: './farmer-add-appointment.component.html',
  styleUrl: './farmer-add-appointment.component.scss'
})
export class FarmerAddAppointmentComponent implements OnInit, OnDestroy {
  private email: string | null = localStorage.getItem('email');
  private selectedVet!: VetProfile;
  
  formData = {
    Description: ''
  };

  loading = false;  // Add loading property for progress bar

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    const vetProfileJson = localStorage.getItem('vet');
    if (vetProfileJson) {
      this.selectedVet = JSON.parse(vetProfileJson);
    } else {
      this.openSnackbar('No Guest Email available!', 'error');
      this.router.navigate(['/farmer/dashboard']);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();

    // Validate form fields
    if (!this.formData.Description) {
      this.openSnackbar('All fields are required.', 'error');
      return;
    }

    // Show progress bar
    this.loading = true;

    const url = `https://localhost:40443/api/account/addappointment`;
    this.http
      .post(url, {
        Content: this.formData.Description,
        Host: this.email,
        Guest: this.selectedVet.email,
        Status: 'Pending'
      })
      .subscribe(
        () => {
          // Hide progress bar
          this.loading = false;
          this.openSnackbar('Appointment added successfully!', 'success');
          this.router.navigate(['/farmer/dashboard']);
        },
        () => {
          // Hide progress bar and show error
          this.loading = false;
          this.openSnackbar('Error adding appointment. Please try again.', 'error');
        }
      );
  }

  onCancel(): void {
    const confirmCancel = window.confirm('Are you sure you want to cancel?');

    if (confirmCancel) {
      // Navigate to the dashboard
      this.router.navigate(['/farmer/dashboard']);
    }
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

  ngOnDestroy(): void {
    //TBD
  }
}
