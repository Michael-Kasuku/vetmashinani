import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router) { } // Inject Router and Auth service
  ngOnInit(): void {
  }

  // Use the Router service to navigate between routes
  navigateTo(route: string): void {
    this.router.navigate([route]); // Navigate using the router
  }
}
