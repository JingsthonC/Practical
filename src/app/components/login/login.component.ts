import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  login(){

    this.http.get<any>("http://localhost:5000/registered") //http://localhost:5000/registered
    .subscribe(res=> {
      const registered = res.find((a : any) => {
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      });
      if (registered) {
        alert ("Log-in Success!");
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      }else{
        alert ('User Not Found!');
      }
    },err => {
      alert ("Something went wrong!");
    })
  }

}
