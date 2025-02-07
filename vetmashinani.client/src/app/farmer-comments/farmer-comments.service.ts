import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FarmerCommentService {
  private apiUrl = `http://localhost:40443/api/farmer/getcomments`; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getComments(appointmentId: number, senderEmail: string, receiverEmail: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?appointmentId=${appointmentId}&senderEmail=${senderEmail}&receiverEmail=${receiverEmail}`);
  }
}
