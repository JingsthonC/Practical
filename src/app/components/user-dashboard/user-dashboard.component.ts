import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserModel } from './user.model';
import { ApiService } from 'src/app/services/api.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  


  p: number = 1;
  faEdit = faEdit;
  faTrash = faTrash;
  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  //tokenData: string = '';

  

    constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient) {
      
    }
  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required]
    })

    this.getUsers();
  }

  onClickAdd() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  
  postUserDetails() :void { 
    this.userModelObj.first_name = this.formValue.value.first_name;
    this.userModelObj.last_name = this.formValue.value.last_name;
    this.userModelObj.email = this.formValue.value.email;


    //this line
    // this.api.getUser()
    // .subscribe(res => {
    //   const alreadyregistered = res.find((already : any) => {    
    //     return already.email === this.formValue.value.email 
    //   });
    //   if (!alreadyregistered) {
    //     this.api.postUser(this.userModelObj)
    //     .subscribe(res => {
    //       console.log(res);
    //       alert('User Added Successfully!');
    //       let ref = document.getElementById('cancel');
    //       ref?.click();
    //       this.formValue.reset(); 
    //       this.getUsers(); // added lang
    //     }, err => {
    //       alert('Something went wrong!');
    //     })
    //   }else{
    //     alert ('Email is in Valid Format but ALREADY USED!');
    //   }
    // },err => {
    //   alert ("Something went wrong!");
    // })
    //to this line is new
    
    this.api.postUser(this.userModelObj)
    .subscribe(res => {
      console.log(res);
      alert('User Added Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset(); 
      this.getUsers(); // added lang
    }, err => {
      alert('Something went wrong!');
    })
  }

  getUsers() {
    this.api.getUser()
    .subscribe(res => {
      this.userData = res;   
    })
  }

  // deleteUser(data: any) {
  //   if(confirm("Are you sure you want to delete?"))
  //   this.api.deleteUser(data.id)
  //   .subscribe(res=>{
  //     alert('User Deleted');
  //     this.getUsers();
  //   })
  // }

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

  onEdit(data: any) {

    this.showAdd = false;
    this.showUpdate = true;

    this.userModelObj.id = data.id;
    this.formValue.controls['first_name'].setValue(data.first_name);
    this.formValue.controls['last_name'].setValue(data.last_name);
    this.formValue.controls['email'].setValue(data.email); 
  
  }

  onUpdate(){
    this.userModelObj.first_name = this.formValue.value.first_name;
    this.userModelObj.last_name = this.formValue.value.last_name;
    this.userModelObj.email = this.formValue.value.email;


    if(confirm("Are you sure you want to update?"))

    this.api.updateUser(this.userModelObj, this.userModelObj.id)
    .subscribe(res=>{
      alert('Updated Successfully!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset(); 
      this.getUsers(); // added lang
    })
  }

  getToken() {
    return localStorage.getItem('token');
  }

  removeToken() {
    localStorage.removeItem('token');
  }
}
