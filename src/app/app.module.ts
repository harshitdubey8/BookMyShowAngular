import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { AdminComponent } from './admin/admin.component';

import { CustomCardComponent } from './custom-card/custom-card.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { SignUpComponent } from './sign-up/sign-up.component';

import { FormsModule } from '@angular/forms';
import { TheatreCardComponent } from './theatre-card/theatre-card.component';
import { SuccessScreenComponent } from './success-screen/success-screen.component';
import { ReviewCardComponent } from './review-card/review-card.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    HomeScreenComponent,
    AdminComponent,

    CustomCardComponent,
    MovieDetailsComponent,
    SignUpComponent,

    TheatreCardComponent,
    SuccessScreenComponent,
    ReviewCardComponent,
    UpdateProfileComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
  ],
  providers: [HttpClient, provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
