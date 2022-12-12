import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ApiloginComponent } from './components/apilogin/apilogin.component';
import { ApiSignUpComponent } from './components/api-sign-up/api-sign-up.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    LoginComponent,
    SignUpComponent,
    AddUserComponent,
    ApiloginComponent,
    ApiSignUpComponent,
    NotFoundComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    // place here ReactiveFormsModule
    ReactiveFormsModule,
    // add HttpClientModule
    HttpClientModule,
    NgxPaginationModule
    
  ],
  providers: [ApiService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
