import { Injectable } from '@angular/core';
import { Widgets, ExternalLinksWidget, Link, NotesWidget, TaskWidget, Task} from './widgets.model';
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

  getWidgets(hobby: Hobby): Observable<Widgets> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets", {headers: header});
  }

  addTask(hobby: Hobby, task: Task): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.post<Task>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/tasks/", task, {headers: header});
  }

  updateTask(hobby: Hobby, task: Task): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    console.log(task._id)
    return this.http.put<Task>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/tasks/" + task._id, task, {headers: header});
  }

  deleteTask(hobby: Hobby, task: Task): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    console.log(task._id)
    console.log('delete is happening?')
    return this.http.delete<Task>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/tasks/" + task._id, {headers: header});
  }

  updateNote(hobby: Hobby, note: NotesWidget): Observable<NotesWidget> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.put<NotesWidget>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/notes/" + note._id, {note}, {headers: header});
  }

  getExternalLinks(hobby: Hobby): Observable<Widgets> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/externallinks", {headers: header});
  }

  getExternalLinksFromQuery(hobby: Hobby, query: String): Observable<Widgets> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/externallinks?query=" + query, {headers: header});
  }

}

