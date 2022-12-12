import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  public signUpForm !: FormGroup;


  constructor(private formBuilder : FormBuilder, private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signUp() {

    this.http.get<any>("http://localhost:5000/registered") //http://localhost:5000/registered
    .subscribe(res=> {
      const alreadyregistered = res.find((already : any) => {
        return already.email === this.signUpForm.value.email 
      });
      if (!alreadyregistered) {
            this.http.post<any>("http://localhost:5000/registered", this.signUpForm.value) //http://localhost:5000/registered
          .subscribe(res=> {
           alert ("Signed-up Successfully@");
            this.signUpForm.reset();
            this.router.navigate(['login']);
            }, err => {
            alert ("Something went wrong"); 
            })
      }else{
        alert ('Email is in Valid Format but ALREADY USED!');
      }
    },err => {
      alert ("Something went wrong!");
    })



  //   this.http.post<any>("https://ng-complete-guide-5a700-default-rtdb.firebaseio.com/registered.json", this.signUpForm.value)
  //   .subscribe(res=> {
  //     alert ("Signed-up Successfully@");
  //     this.signUpForm.reset();
  //     this.router.navigate(['login']);
  //   }, err => {
  //     alert ("Something went wrong"); 
  //   })
  }

}
