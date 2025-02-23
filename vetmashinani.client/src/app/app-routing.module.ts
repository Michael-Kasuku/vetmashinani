import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { FarmerLoginComponent } from './farmer-login/farmer-login.component';
import { FarmerSignupComponent } from './farmer-signup/farmer-signup.component';
import { FarmerForgotPasswordComponent } from './farmer-forgot-password/farmer-forgot-password.component';
import { FarmerDashboardComponent } from './farmer-dashboard/farmer-dashboard.component';
import { FarmerMyProfileComponent } from './farmer-my-profile/farmer-my-profile.component';
import { FarmerAppointmentsComponent } from './farmer-appointments/farmer-appointments.component';
import { FarmerCommentsComponent } from './farmer-comments/farmer-comments.component';
import { FarmerAddAppointmentComponent } from './farmer-add-appointment/farmer-add-appointment.component';
import { VetLoginComponent } from './vet-login/vet-login.component';
import { VetSignupComponent } from './vet-signup/vet-signup.component';
import { VetForgotPasswordComponent } from './vet-forgot-password/vet-forgot-password.component';
import { VetDashboardComponent } from './vet-dashboard/vet-dashboard.component';
import { VetMyProfileComponent } from './vet-my-profile/vet-my-profile.component';
import { VetAppointmentsComponent } from './vet-appointments/vet-appointments.component';
import { VetCommentsComponent } from './vet-comments/vet-comments.component';
import { VetAddAppointmentComponent } from './vet-add-appointment/vet-add-appointment.component';

import { VetAuthGuard } from './vet-auth/vet-auth.guard';
import { FarmerAuthGuard } from './farmer-auth/farmer-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'farmer/login', component: FarmerLoginComponent },
  { path: 'farmer/signup', component: FarmerSignupComponent },
  { path: 'farmer/forgot', component: FarmerForgotPasswordComponent },
  { path: 'farmer/dashboard', component: FarmerDashboardComponent, canActivate: [FarmerAuthGuard] },
  { path: 'farmer/myprofile', component: FarmerMyProfileComponent, canActivate: [FarmerAuthGuard] },
  { path: 'farmer/appointments', component: FarmerAppointmentsComponent, canActivate: [FarmerAuthGuard] },
  { path: 'farmer/comments', component: FarmerCommentsComponent, canActivate: [FarmerAuthGuard] },
  { path: 'farmer/addappointment', component: FarmerAddAppointmentComponent, canActivate: [FarmerAuthGuard] },
  { path: 'vet/login', component: VetLoginComponent },
  { path: 'vet/signup', component: VetSignupComponent },
  { path: 'vet/forgot', component: VetForgotPasswordComponent },
  { path: 'vet/dashboard', component: VetDashboardComponent, canActivate: [VetAuthGuard] },
  { path: 'vet/myprofile', component: VetMyProfileComponent, canActivate: [VetAuthGuard] },
  { path: 'vet/appointments', component: VetAppointmentsComponent, canActivate: [VetAuthGuard] },
  { path: 'vet/comments', component: VetCommentsComponent, canActivate: [VetAuthGuard] },
  { path: 'vet/addappointment', component: VetAddAppointmentComponent, canActivate: [VetAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
