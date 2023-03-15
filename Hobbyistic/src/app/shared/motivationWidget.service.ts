import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MotivationWidget } from './motivationWidget.model';
import { Hobby } from './hobby.model';
import { Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class motivationWidgetService
{
    constructor(private http: HttpClient, private router: Router) { }

    uploadPost(hobby: Hobby, post: MotivationWidget, photo: File): Observable<MotivationWidget> {
        let formData: FormData = new FormData();
        formData.append('photo', photo);
        formData.append('title', post.title ?? '');
        formData.append('sharable', post.sharable?.toString() ?? '');
        formData.append('description', post.description ?? '');
        let headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
        return this.http.post(`${environment.apiUrl}hobby/${hobby.id}/widgets/motivation/post`, formData, {headers: headers});
    }

    getAllPosts(hobby: Hobby): Observable<MotivationWidget[]>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget[]>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/motivation/post", {headers: header});
    }

    getAllPublicPosts(hobby: Hobby): Observable<MotivationWidget[]>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget[]>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/motivation/post?scope=public", {headers: header});
    }

    getSinglePost(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/motivation/post/" + motivationWidget._id, {headers: header});
    }

    getPostImage(hobby: Hobby, motivationWidget: MotivationWidget): Observable<Blob>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/motivation/post/" + motivationWidget._id + "/image", {headers: header, responseType: 'blob'});
      }

    addPost(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.post<MotivationWidget>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/motivation/post", {motivationWidget}, {headers: header});
    }

    deletePost(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.delete<MotivationWidget>(`${environment.apiUrl}hobby/` + hobby.id + "/widgets/motivation/post/" + motivationWidget._id, {headers: header});
    }

}