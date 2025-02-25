import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VetCommentService {
  private apiUrl = `https://localhost:40443/api/account/getcomments`; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getComments(appointmentId: string, senderEmail: string, receiverEmail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?appointmentId=${appointmentId}&senderEmail=${senderEmail}&receiverEmail=${receiverEmail}`);
  }
}
