import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MotivationWidget } from './motivationWidget.model';
import { Hobby } from './hobby.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class motivationWidgetService
{
    constructor(private http: HttpClient, private router: Router) { }

    getAllPosts(hobby: Hobby): Observable<MotivationWidget[]>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget[]>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/motivation/post", {headers: header});
    }

    getAllPublicPosts(hobby: Hobby): Observable<MotivationWidget[]>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget[]>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/motivation/post?scope=public", {headers: header});
    }

    getSinglePost(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/motivation/post/" + motivationWidget._id, {headers: header});
    }

    getPostImage(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.get<MotivationWidget>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/motivation/post/" + motivationWidget.image + "/image", {headers: header});
    }

    addPost(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.post<MotivationWidget>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/motivation/post", {motivationWidget}, {headers: header});
    }

    deletePost(hobby: Hobby, motivationWidget: MotivationWidget): Observable<MotivationWidget>{
        let header = new HttpHeaders().set('Authorization',`Bearer ${localStorage.getItem('token')!}`);
        return this.http.delete<MotivationWidget>("http://localhost:3000/api/hobby/" + hobby.id + "/widgets/motivation/post/" + motivationWidget._id, {headers: header});
    }

}