import {  Component, 
          OnInit } from '@angular/core';
import {  FormBuilder, 
          FormGroup, 
          Validators } from '@angular/forms';
import {  HttpClient} from '@angular/common/http';
import {  Router } from '@angular/router';
import {  ApiService } from 'src/app/services/api.service';
import {  ApiLoginModel } from './api-login.model';
import {  AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-apilogin',
  templateUrl: './apilogin.component.html',
  styleUrls: ['./apilogin.component.css']
})
export class ApiloginComponent implements OnInit {

  public loginForm !: FormGroup;
  userModelObj : ApiLoginModel = new ApiLoginModel();
  tokenData: string;


  constructor(private auth: AuthService, private formBuilder : FormBuilder, private http: HttpClient, private router: Router, private api: ApiService) {

  }

  ngOnInit(): void {
    //to avoid returning to logged in when authenticated
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin']);
      alert('Still Logged In!');
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: [''],
    })
    
  }

  signIn() :void { 
    this.userModelObj.email = this.loginForm.value.email;
    this.userModelObj.password = this.loginForm.value.password;
    
    this.api.signInUser(this.userModelObj)
    .subscribe(res => { 
      alert('Logged In Successfully! \n'); 
      this.loginForm.reset();
      this.router.navigate(['/admin']);
      localStorage.setItem('token',JSON.stringify(this.tokenData = res));
    }, err => {
      alert( JSON.stringify(err?.error?.error ));
      console.log(err?.error?.error)
    })
  }
}

