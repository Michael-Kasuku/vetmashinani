import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { VetAuthInterceptor } from './vet-auth/vet-auth.interceptor';
import { FarmerAuthInterceptor } from './farmer-auth/farmer-auth.interceptor';

// Angular Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // MatOption is included in MatSelectModule, but explicit imports are sometimes needed
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { FarmerForgotPasswordComponent } from './farmer-forgot-password/farmer-forgot-password.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { VetLoginComponent } from './vet-login/vet-login.component';
import { VetSignupComponent } from './vet-signup/vet-signup.component';
import { VetForgotPasswordComponent } from './vet-forgot-password/vet-forgot-password.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';
import { VetFarmerProfilesComponent } from './vet-farmer-profiles/vet-farmer-profiles.component';
import { VetMyProfileComponent } from './vet-my-profile/vet-my-profile.component';
import { FarmerVetProfilesComponent } from './farmer-vet-profiles/farmer-vet-profiles.component';
import { FarmerMyProfileComponent } from './farmer-my-profile/farmer-my-profile.component';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { FarmerAppointmentsComponent } from './farmer-appointments/farmer-appointments.component';
import { VetCommentsComponent } from './vet-comments/vet-comments.component';
import { FarmerCommentsComponent } from './farmer-comments/farmer-comments.component';
import { VetAddAppointmentComponent } from './vet-add-appointment/vet-add-appointment.component';
import { FarmerAddAppointmentComponent } from './farmer-add-appointment/farmer-add-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FarmerLoginComponent,
    FarmerSignupComponent,
    FarmerForgotPasswordComponent,
    FarmerDashboardComponent,
    VetLoginComponent,
    VetSignupComponent,
    VetForgotPasswordComponent,
    VetDashboardComponent,
    VetFarmerProfilesComponent,
    VetMyProfileComponent,
    FarmerVetProfilesComponent,
    FarmerMyProfileComponent,
    VetAppointmentsComponent,
    FarmerAppointmentsComponent,
    VetCommentsComponent,
    FarmerCommentsComponent,
    VetAddAppointmentComponent,
    FarmerAddAppointmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatDialogModule,
    MatBadgeModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatOptionModule,
    MatTabsModule,
    MatRadioModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: VetAuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: FarmerAuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
