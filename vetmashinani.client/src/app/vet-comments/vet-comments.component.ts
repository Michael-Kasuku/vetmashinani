import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VetCommentService } from './vet-comment.service';
import { Appointment } from '../vet-appointments/vet-appointments.component';

interface Comment {
  appointmentId:number,
  sender: string | null;
  receiver: string | null;
  content: string;
  timestamp: Date;
}
@Component({
  selector: 'app-vet-comments',
  standalone: false,
  
  templateUrl: './vet-comments.component.html',
  styleUrl: './vet-comments.component.scss'
})
export class VetCommentsComponent  {
  currentUserEmail: string | null = localStorage.getItem('email');
  selectedAppointment!: Appointment;
  comments: { [key: string]: Comment[] } = {}; // Categorized by date
  newComment: string = '';

  constructor(
    private vetCommentService: VetCommentService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const appointmentJson = localStorage.getItem('appointment');
    if (appointmentJson) {
      this.selectedAppointment = JSON.parse(appointmentJson);
      this.fetchComments();
    } else {
      this.openSnackbar('No Vet or Sender Email available!', 'error');
      this.router.navigate(['/vet/dashboard']);
    }
  }

  get objectKeys() {
    return Object.keys;
  }

  fetchComments(): void {
    if (this.currentUserEmail && this.selectedAppointment.id) {
      this.vetCommentService.getComments(this.selectedAppointment.id, this.currentUserEmail, this.currentUserEmail).subscribe(
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

  sendComment(): void {
    //Send the comment to the database
  }

  openSnackbar(message: string, severity: 'success' | 'error') {
    const snackBarClass = severity === 'success' ? 'snackbar-success' : 'snackbar-error';
    this.snackBar.open(message, 'Close', { duration: 3000, panelClass: snackBarClass });
  }
}
