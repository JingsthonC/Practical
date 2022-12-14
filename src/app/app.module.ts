import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiloginComponent } from './components/apilogin/apilogin.component';
import { ApiSignUpComponent } from './components/api-sign-up/api-sign-up.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    ApiloginComponent,
    ApiSignUpComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    // place here ReactiveFormsModule
    ReactiveFormsModule,
    // add HttpClientModule
    HttpClientModule,
    RouterModule
    
  ],
  providers: [ApiService,AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
