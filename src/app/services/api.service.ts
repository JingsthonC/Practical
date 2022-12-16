import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private token = '';
  public apiURL = 'https://reqres.in/api/users';  

  // inject here private http: HttpClient
  constructor(private http: HttpClient) { }


  postUser(datas: any) {
    return this.http.post<any>('https://reqres.in/api/users', datas)
    .pipe(map((res:any)=>{
      return res?.data;
    })) 
   }

   getUser(){
    return this.http.get<any>('https://reqres.in/api/users?page=1&per_page=12'
    )
    .pipe(map((res: any) => {
      return res?.data; //res is now a json file that is accessing a data propoerty
    }))
   }

   updateUser(data: any, id : number) {
    return this.http.put<any>('http://localhost:5000/users/'+id, data)
    .pipe(map((res:any) => {
      return res;
    }))
   }

  //  deleteUser (id: number) {
  //   return this.http.delete<any>('http://localhost:5000/users/'+id)
  //   .pipe(map((res:any) => {
  //     return res;
  //   }))
  //  }

   apiDeleteUser2 (id: number) {
    return this.http.delete<any>('https://reqres.in/api/users/'+id)
    .pipe(map((res:any) => {
      return res;
    }))
   }

  apiDeleteUser () {
    return this.http.delete<any>('https://reqres.in/api/users/2')
    .pipe(map((res:any) => {
      return res?.data;
    }))
   }

   signInUser(datas: any) {
    return this.http.post<any>('https://reqres.in/api/login', datas)
    .pipe(map((res:any)=>{
      return res?.token;
    })) 
   }

   apiUpdateUser(data: any) {
    return this.http.put<any>('https://reqres.in/api/users/2', data)
    .pipe(map((res:any) => {
      return res;
    }))
   }

   apiSignUp(datas: any) {
    return this.http.post<any>('https://reqres.in/api/register', datas)
    .pipe(map((res:any)=>{
      return res?.data;
    })) 
   }
   


}

