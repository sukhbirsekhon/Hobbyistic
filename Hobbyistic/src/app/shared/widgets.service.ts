import { Injectable } from '@angular/core';
import { Widgets, ExternalLinksWidget, Link, NotesWidget, TaskWidget, Task} from './widgets.model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';
import { Hobby } from './hobby.model';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class WidgetsService {

  constructor(private http: HttpClient, private router: Router) { }

  getWidgets(hobby: Hobby): Observable<Widgets> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets", {headers: header});
  }

  addTask(hobby: Hobby, task: Task): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.post<Task>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/tasks/", task, {headers: header});
  }

  updateTask(hobby: Hobby, task: Task): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    console.log(task._id)
    return this.http.put<Task>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/tasks/" + task._id, task, {headers: header});
  }

  deleteTask(hobby: Hobby, task: Task): Observable<Task> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    console.log(task._id)
    console.log('delete is happening?')
    return this.http.delete<Task>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/tasks/" + task._id, {headers: header});
  }

  updateNote(hobby: Hobby, note: NotesWidget): Observable<NotesWidget> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.put<NotesWidget>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/notes/" + note._id, {note}, {headers: header});
  }

  getExternalLinks(hobby: Hobby): Observable<Widgets> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/externallinks", {headers: header});
  }

  getExternalLinksFromQuery(hobby: Hobby, query: String): Observable<Widgets> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Widgets>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/externallinks?query=" + query, {headers: header});
  }

  getAssistantMessageHistory(hobby: Hobby): Observable<Message[]> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Message[]>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/assistant", {headers: header});
  }

  getAssistantResponseAndMessageWithHistory(hobby: Hobby, message: Message): Observable<Message[]> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<Message[]>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/assistant?history=true&message=" + message.content, {headers: header});
  }

  getAssistantResponseAndMessage(hobby: Hobby, message: Message): Observable<any> {
    let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
    return this.http.get<any>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/assistant?&message=" + message.content, {headers: header});
  }

}

