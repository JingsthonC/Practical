import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { ApiSignUpModel } from './api-sign-up.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-api-sign-up',
  templateUrl: './api-sign-up.component.html',
  styleUrls: ['./api-sign-up.component.css']
})
export class ApiSignUpComponent implements OnInit {

  public loginForm !: FormGroup;
  userModelObj : ApiSignUpModel = new ApiSignUpModel();
  userData !: any;



  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private api: ApiService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [''],
    })
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
      alert('Still Logged In!');
    }
  }

  signUp() :void { 
    this.userModelObj.email = this.loginForm.value.email;
    this.userModelObj.password = this.loginForm.value.password;
    
    this.api.apiSignUp(this.userModelObj)
    .subscribe(res => {
      console.log(res);
      alert('Registred Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.loginForm.reset(); 
      this.router.navigate(['/login']);
      
    }, err => {
      alert( JSON.stringify(err?.error?.error));
      console.log(err?.error?.error)
    })
  }
}

