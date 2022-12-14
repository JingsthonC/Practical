import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserModel } from './user.model';
import { ApiService } from 'src/app/services/api.service';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  

  newNumberofPages !: boolean;
  previous !: boolean;
  next !: boolean;
  p: number = 1;
  faEdit = faEdit;
  faTrash = faTrash;
  formValue !: FormGroup;
  showAdd !: boolean;
  showUpdate !: boolean;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  // userData : any[] = [];
  private apiUrl:string = 'https://reqres.in/api/users?'; 
  //for pagination no library//
  per_page: string ='';
  pageNumber: string = '';
  total: string = '';
  pageNumbers: any[] = [];
  public selectedPage = this.pageNumbers[0];
  imgUrl: string;
  

    constructor(private formBuilder: FormBuilder, private api: ApiService, private http: HttpClient) {}
  ngOnInit(): void {
    
    this.formValue = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      //testing for avatar url
      avatar: ['']
    })

    // for new pagination no library//
    this.changeDisplay();
    this.pageNumbers.push(1);
    this.newNumberofPages = false;
    
    
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
    //test for avatar url
    this.userModelObj.avatar = this.formValue.value.avatar;

    
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
    this.formValue.controls['avatar'].setValue(data.avatar);
    this.imgUrl = this.formValue.controls['avatar'].value;
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

  changeDisplay() {
    this.per_page = '12';
    const queryString: string = `${this.apiUrl}page=1&per_page=${this.per_page}`;
    this.http.get<any>(queryString).pipe(map((res: any) => {
      this.per_page = '';
      return res;
    })).subscribe(res => {
      this.userData = res?.data;
      this.total = res?.total;
    })
  }

  changeNumber(event: any){
    this.previous = false;
    this.next = true;
    this.newNumberofPages = true;
    this.selectedPage = '1';
    this.pageNumbers = [];
    this.per_page = (<HTMLSelectElement>event.target).value;

      if(this.per_page === '12'){
        this.newNumberofPages = false;
      }

    let division = (parseInt(this.total) / parseInt(this.per_page));
    
      for ( let i = 1; i <= division; i++){
        this.pageNumbers.push(i);
      }

    this.pageNumber = division.toString(); 
    const queryString: string = `${this.apiUrl}page=1&per_page=${this.per_page}`;
    this.http.get<any>(queryString).pipe(map((res: any) => {
      return res;
    })).subscribe(res => {
      this.userData = res?.data;   
    })
  }
  onPageChange(page: any){
    this.selectedPage = page;
    const queryString: string = `${this.apiUrl}page=${page}&per_page=${this.per_page}`;
    this.http.get<any>(queryString).pipe(map((res: any) => {
      return res;
    })).subscribe(res => {
      this.userData = res?.data;   
    })
    switch(page) {
      case 1:
        // code block
        this.previous = false;
        this.next = true;
        break;
      case page = Math.max.apply(null, this.pageNumbers):
        // code block
        this.previous = true;
        this.next = false;
        break;
      default:
        // code block
        this.previous = true;
        this.next = true;
    }
  }
  onPrevious(){
    this.selectedPage = parseInt(this.selectedPage) - 1;
    this.next = true;
    if(this.selectedPage === 0) {
      this.previous = false;
    }
    const queryString: string = `${this.apiUrl}page=${this.selectedPage.toString()}&per_page=${this.per_page}`;
    this.http.get<any>(queryString).pipe(map((res: any) => {
      return res;
    })).subscribe(res => {
      this.userData = res?.data;   
    })
  }

  onNext(){
    this.selectedPage = parseInt(this.selectedPage) + 1;
    this.previous = true;
    if(this.selectedPage === Math.max.apply(null, this.pageNumbers)) {
      this.next = false;
      }
    const queryString: string = `${this.apiUrl}page=${this.selectedPage.toString()}&per_page=${this.per_page}`;
    this.http.get<any>(queryString).pipe(map((res: any) => {
      return res;
    })).subscribe(res => {
      this.userData = res?.data;   
    })
  }
}
