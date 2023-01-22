import { Injectable } from '@angular/core';
import { Widgets } from './widgets.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { Hobby } from './hobby.model';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient, private router: Router) { }

  GetWidgets(hobby: Hobby): Observable<Widgets[]> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets[]>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets", {headers: header});
  }

  AddTasks(tasks: Task, hobby: Hobby): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.post<Task>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/tasks", {tasks}, {headers: header});
  }


}
