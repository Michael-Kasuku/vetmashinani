import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FarmerCommentService } from './farmer-comments.service';
import { Appointment } from '../farmer-appointments/farmer-appointments.component';
import { VetProfile } from '../farmer-vet-profiles/farmer-vet-profiles.component';
import { HttpClient } from '@angular/common/http';

interface Comment {
  appointmentId: number,
  sender: string | null;
  receiver: string | null;
  content: string;
  timestamp: Date;
}

@Component({
  selector: 'app-farmer-comments',
  standalone: false,
  
  templateUrl: './farmer-comments.component.html',
  styleUrl: './farmer-comments.component.scss'
})
export class FarmerCommentsComponent {
  currentUserEmail: string | null = localStorage.getItem('email');
  selectedAppointment!: Appointment;
  private selectedVet!: VetProfile;
  comments: { [key: string]: Comment[] } = {}; // Categorized by date
  formData = {
    newComment: ''
  };

  constructor(
    private http: HttpClient,
    private farmerCommentService: FarmerCommentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const appointmentJson = localStorage.getItem('appointment');
    if (appointmentJson) {
      this.selectedAppointment = JSON.parse(appointmentJson);
    } else {
      this.openSnackbar('No Appointment available!', 'error');
      this.router.navigate(['/farmer/dashboard']);
    }
    const selectedVetJson = localStorage.getItem('vet');
    if (selectedVetJson) {
      this.selectedVet = JSON.parse(selectedVetJson);
    } else {
      this.openSnackbar('No Host or Guest available!', 'error');
      this.router.navigate(['/farmer/dashboard']);
    }
    this.fetchComments();
  }

  get objectKeys() {
    return Object.keys;
  }

  fetchComments(): void {
    if (this.selectedAppointment.id && this.currentUserEmail && this.selectedVet.email) {
      this.farmerCommentService.getComments(this.selectedAppointment.id, this.currentUserEmail, this.selectedVet.email).subscribe(
        (data: Comment[]) => {
          this.comments = this.categorizeMessagesByDate(data);
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
      const date = new Date(comment.timestamp).toDateString();
      acc[date] = acc[date] || [];
      acc[date].push(comment);
      return acc;
    }, {} as { [key: string]: Comment[] });
  }

  sendComment(event: Event) {
    event.preventDefault();
    // Validate whether a comment has been provided
    if (!this.formData.newComment) {
      this.openSnackbar('Please add a comment.', 'error');
      return;
    }

    const url = `https://localhost:40443/api/account/addcomment`;
    this.http
      .post(url, {
        AppointmentId: this.selectedAppointment.id,
        Sender: this.currentUserEmail,
        Receiver: this.selectedVet.email,
        Content: this.formData.newComment
      })
      .subscribe(
        () => {
          this.openSnackbar('Comment added successfully!', 'success');
        },
        () => {
          this.openSnackbar('Error adding comment. Please try again.', 'error');
        }
      );
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: snackBarClass });
  }
}
