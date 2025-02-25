import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VetCommentService } from './vet-comments.service';
import { Appointment } from '../vet-appointments/vet-appointments.component';
import { HttpClient } from '@angular/common/http';

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

interface Comment {
  appointmentId: number;
  sender: string | null;
  receiver: string | null;
  content: string;
  sentAt: Date; // Ensure it's always a Date object
}

@Component({
  selector: 'app-vet-comments',
  standalone: false,
  templateUrl: './vet-comments.component.html',
  styleUrls: ['./vet-comments.component.scss']
})
export class VetCommentsComponent implements OnInit {
  currentUserEmail: string | null = localStorage.getItem('email');
  selectedAppointment!: Appointment;
  private selectedFarmer!: FarmerProfile;
  comments: { [key: string]: Comment[] } = {}; // Categorized by date
  formData = {
    newComment: ''
  };

  constructor(
    private http: HttpClient,
    private vetCommentService: VetCommentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadStoredData();
    this.fetchComments();
  }

  get objectKeys() {
    return Object.keys;
  }

  loadStoredData(): void {
    const appointmentJson = localStorage.getItem('appointment');
    if (appointmentJson) {
      this.selectedAppointment = JSON.parse(appointmentJson);
    } else {
      this.openSnackbar('No Appointment available!', 'error');
      this.router.navigate(['/vet/dashboard']);
      return;
    }

    const selectedFarmerJson = localStorage.getItem('farmer');
    if (selectedFarmerJson) {
      this.selectedFarmer = JSON.parse(selectedFarmerJson);
    } else {
      this.openSnackbar('No Host or Guest available!', 'error');
      this.router.navigate(['/vet/dashboard']);
    }
  }

  fetchComments(): void {
    if (this.selectedAppointment.id && this.currentUserEmail && this.selectedFarmer.email) {
      this.vetCommentService.getComments(
        String(this.selectedAppointment.id),
        this.currentUserEmail,
        this.selectedFarmer.email
      ).subscribe(
        (data: Comment[]) => {
          this.comments = this.categorizeMessagesByDate(
            data.map(comment => ({
              ...comment,
              sentAt: new Date(comment.sentAt) // Ensure it's stored as a Date
            }))
          );
        },
        (error) => {
          console.error('Error fetching comments:', error);
          this.openSnackbar('Failed to load comment history.', 'error');
        }
      );
    }
  }

  categorizeMessagesByDate(comments: Comment[]): { [key: string]: Comment[] } {
    return comments.reduce((acc, comment) => {
      const dateKey = comment.sentAt.toLocaleDateString('en-US', {
        timeZone: 'Africa/Nairobi',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(comment);
      return acc;
    }, {} as { [key: string]: Comment[] });
  }

  sendComment(event: Event): void {
    event.preventDefault();

    if (!this.formData.newComment.trim()) {
      this.openSnackbar('Please add a comment.', 'error');
      return;
    }

    const url = `https://localhost:40443/api/account/addcomment`;
    this.http.post(url, {
      AppointmentId: String(this.selectedAppointment.id),
      Sender: this.currentUserEmail,
      Receiver: this.selectedFarmer.email,
      Content: this.formData.newComment
    }).subscribe(
      () => {
        this.openSnackbar('Comment added successfully!', 'success');
        this.formData.newComment = ''; // Clear input field
        this.fetchComments(); // Refresh comments
      },
      () => {
        this.openSnackbar('Error adding comment. Please try again.', 'error');
      }
    );
  }

  back(): void {
    this.router.navigate(['/vet/appointments']);
  }

  openSnackbar(message: string, severity: 'success' | 'error'): void {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: snackBarClass });
  }
}
