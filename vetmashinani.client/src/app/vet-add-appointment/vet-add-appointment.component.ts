import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FarmerProfile } from '../vet-farmer-profiles/vet-farmer-profiles.component';

@Component({
  selector: 'app-vet-add-appointment',
  standalone: false,
  
  templateUrl: './vet-add-appointment.component.html',
  styleUrl: './vet-add-appointment.component.scss'
})
export class VetAddAppointmentComponent implements OnInit, OnDestroy {
  private email: string | null = localStorage.getItem('email');
  private selectedFarmer!: FarmerProfile;
  formData = {
    Description: ''
  };

  loading = false;  // Add loading property for progress bar

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    const farmerProfileJson = localStorage.getItem('farmer');
    if (farmerProfileJson) {
      this.selectedFarmer = JSON.parse(farmerProfileJson);
    } else {
      this.openSnackbar('No Guest Email available!', 'error');
      this.router.navigate(['/vet/dashboard']);
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
        Description: this.formData.Description,
        Host: this.email,
        Guest: this.selectedFarmer.email,
        Status: 'Pending'
      })
      .subscribe(
        () => {
          // Hide progress bar
          this.loading = false;
          this.openSnackbar('Appointment added successfully!', 'success');
          this.router.navigate(['/vet/dashboard']);
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
      this.router.navigate(['/vet/dashboard']);
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
