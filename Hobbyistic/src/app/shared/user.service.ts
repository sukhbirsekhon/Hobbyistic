import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { Hobby } from './hobby.model';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient, private router: Router) { }

  CreateUser(name: string, email: string, password: string){
    const user: User = {name:name, email: email, password: password}
    this.http.post(`${environment.apiUrl}register`, user)
    .subscribe(response =>{
      console.log(response);
      this.router.navigate(['/login']);
    })
  }

  AuthenticateUser(name: string, email: string, password: string) {
    const user: User = {name:name, email: email, password: password}
    this.http.post(`${environment.apiUrl}login`, {user})
    .subscribe(response =>{
      console.log(response)
      var token = [JSON.stringify(response)][0].slice(18, [JSON.stringify(response)][0].length - 3)
      console.log(token)
      localStorage.setItem('token', token)
      this.router.navigate(['/main']);
    })
  }

  AddHobby(name: string) {
    let header = new HttpHeaders().set(
      'Authorization',
       `Bearer ${localStorage.getItem('token')!}`
    );
    const hobby: Hobby = {name:name}
    console.log('inside add hobby')
    console.log({hobby})
    this.http.post(`${environment.apiUrl}hobby`, {hobby}, {headers: header})
    .subscribe(response =>{
      console.log(response);
      this.router.navigate(['/main']);
    })
  }

  GetAllHobbies(): Observable<Hobby[]> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Hobby[]>(`${environment.apiUrl}hobby`, {headers: header});
  }

  GetSingleHobby(hobby: Hobby): Observable<Hobby> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Hobby>(`${environment.apiUrl}hobby/` + hobby.id, {headers: header});
  }

  updateHobby(hobby: Hobby): Observable<Hobby> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.put<Hobby>(`${environment.apiUrl}hobby/` + hobby.id, {hobby}, {headers: header});
  }

  deleteHobby(hobby: Hobby): Observable<any> {
    console.log("Delete should have been sent")
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.delete(`${environment.apiUrl}hobby/` + hobby.id, {headers: header});
  }


}
