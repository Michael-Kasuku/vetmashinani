import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VetCommentService } from './vet-comments.service';
import { Appointment } from '../vet-appointments/vet-appointments.component';
import { FarmerProfile } from '../vet-farmer-profiles/vet-farmer-profiles.component';
import { HttpClient } from '@angular/common/http';

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
    const appointmentJson = localStorage.getItem('appointment');
    if (appointmentJson) {
      this.selectedAppointment = JSON.parse(appointmentJson);
    } else {
      this.openSnackbar('Appointment available!', 'error');
      this.router.navigate(['/vet/dashboard']);
    }
    const selectedFarmerJson = localStorage.getItem('farmer');
    if (selectedFarmerJson) {
      this.selectedFarmer = JSON.parse(selectedFarmerJson);
    } else {
      this.openSnackbar('No Hots or Guest available!', 'error');
      this.router.navigate(['/vet/dashboard']);
    }
    this.fetchComments();
  }

  get objectKeys() {
    return Object.keys;
  }

  fetchComments(): void {
    if ( this.selectedAppointment.id&&this.currentUserEmail&&this.selectedFarmer.email) {
      this.vetCommentService.getComments(this.selectedAppointment.id, this.currentUserEmail, this.selectedFarmer.email).subscribe(
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

  sendComment(event: Event){
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
        Receiver: this.selectedFarmer.email,
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
