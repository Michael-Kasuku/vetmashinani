import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

export interface Appointment {
  id: number;
  description: string;
  host: string;
  guest: string;
  status: string;
  dateAdded: string;
}

@Component({
  selector: 'app-farmer-appointments',
  standalone: false,
  
  templateUrl: './farmer-appointments.component.html',
  styleUrl: './farmer-appointments.component.scss'
})
export class FarmerAppointmentsComponent {
  private email: string | null = localStorage.getItem('email');
  displayedColumns: string[] = ['id', 'description', 'host', 'guest', 'dateAdded', 'status', 'actions'];
  dataSource = new MatTableDataSource<Appointment>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const url = `https://localhost:40443/api/account/getappointments?Email=${this.email}`;
    this.http.get<Appointment[]>(url).subscribe({
      next: (data) => {
        this.dataSource.data = data;
      },
      error: (err) => {
        this.openSnackbar('Failed to Fetch Appointments!', 'error');
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Utility method to show snackbar notifications
  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: snackBarClass,
    });
  }

  addAppointment(): void {
    // Navigate to the add appointment page
    this.router.navigate(['/farmer/addappointment']);
  }

  comment(appointment: Appointment): void {
    // Store the Appointment in local storage
    localStorage.setItem('appointment', JSON.stringify(appointment));
    this.router.navigate([`/vet/comments`]);
  }

  approve(appointment: Appointment): void {
    if (confirm(`Are you sure you want to approve ${appointment.description}?`)) {
      const url = `https://localhost:40443/api/account/approveappointment`;

      this.http.put(url, {
        Id: appointment.id,
        Host: appointment.guest,
        Status: 'Approved'
      }).subscribe(
        () => {
          this.openSnackbar('Appointment approved successfully!', 'success');
          // Reload the current page to reflect changes
          window.location.reload();

        },
        (error) => {
          const errorMessage = error.error?.message || 'Error in approving the appointment. Please try again.';
          this.openSnackbar(errorMessage, 'error');
        }
      );
    }
  }

  cancel(appointment: Appointment): void {
    if (confirm(`Are you sure you want to cancel ${appointment.description}?`)) {
      const url = `https://localhost:40443/api/account/cancelappointment`;

      this.http.put(url, {
        Id: appointment.id,
        Host: appointment.host,
        Status: 'Cancelled'
      }).subscribe(
        () => {
          this.openSnackbar('Appointment cancelled successfully!', 'success');
          // Reload the current page to reflect changes
          window.location.reload();
          
        },
        (error) => {
          const errorMessage = error.error?.message || 'Error in cancelling the appointment. Please try again.';
          this.openSnackbar(errorMessage, 'error');
        }
      );
    }
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
