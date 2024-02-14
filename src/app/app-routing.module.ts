import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AdminComponent } from './admin/admin.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { SuccessScreenComponent } from './success-screen/success-screen.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { AdminTheaterComponent } from './admin-theater/admin-theater.component';
import { AdminRegistrationComponent } from './admin-registration/admin-registration.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeScreenComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Forgot', component: ForgotPasswordComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'AdminReg', component: AdminRegistrationComponent },
  { path: 'Admin', component: AdminComponent },
  { path: 'TheatreAdmin', component: AdminTheaterComponent },
  { path: 'success', component: SuccessScreenComponent },
  { path: 'profile', component: UpdateProfileComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
