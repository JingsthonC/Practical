import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AddUserModel } from '../header/addUser.model';
import { ApiService } from 'src/app/services/api.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit {

  p: number = 1;

  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  showDelete !: boolean;
  userModelObj : AddUserModel = new AddUserModel();
  userData !: any;

  

    constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient) {
      
    }
  ngOnInit(): void {
    
    
    this.formValue = this.formBuilder.group({
      name : ['', Validators.required],
      job: ['', Validators.required],
    })
    this.getUsers();
    
  }

  onClickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
    this.showDelete = false;
  }

  
  postUserDetails() :void { 
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.job = this.formValue.value.job;

    this.api.postUser(this.userModelObj)
    .subscribe(res => {
      console.log(res);
      alert('User Added Successfully!');
      this.showAdd = false;
      this.showUpdate = true;
      this.showDelete = true;
    }, err => {
      alert( JSON.stringify(err?.error ));
      console.log(err?.error)
    })
  }

  onUpdate(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.job = this.formValue.value.job;


    if(confirm("Are you sure you want to update?"))

    this.api.apiUpdateUser(this.userModelObj)
    .subscribe(res=>{
      alert('Updated Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      //this.formValue.reset(); 
      this.getUsers(); // added lang
    })
  }

  deleteUser() {
    if(confirm("Are you sure you want to delete?")){
      this.api.apiDeleteUser()
      .subscribe(res=>{
        alert('User Deleted');
        let ref = document.getElementById('leave');
        ref?.click();
      })
    }
 
  }

  getUsers() {
    this.api.getUser()
    .subscribe(res => {
      this.userData = res;   
    })
  }
  removeToken() {
    localStorage.removeItem('token');
  }
}



  


