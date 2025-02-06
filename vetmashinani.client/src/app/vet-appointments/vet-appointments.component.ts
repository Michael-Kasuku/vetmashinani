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
  dateAdded: string;
  status: string;
}
@Component({
  selector: 'app-vet-appointments',
  standalone: false,
  
  templateUrl: './vet-appointments.component.html',
  styleUrl: './vet-appointments.component.scss'
})
export class VetAppointmentsComponent implements OnInit, AfterViewInit {
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
    const url = `https://localhost:40443/api/vet/getappointments?Email=${this.email}`;
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
    this.router.navigate(['/vet/add/appointment']);
  }

  comment(appointment: Appointment): void {
    localStorage.setItem('id', appointment.id.toString());
    this.router.navigate([`/vet/comments`]);
  }

  approve(appointment: Appointment): void {
    if (confirm(`Are you sure you want to approve ${appointment.description}?`)) {
      //Change the status to "Approved"
    }
  }

  cancel(appointment: Appointment): void {
    if (confirm(`Are you sure you want to cancel ${appointment.description}?`)) {
      //Change the status to "Cancelled"
    }
  }

  closeSnackbar() {
    this.snackBar.dismiss();
  }
}
