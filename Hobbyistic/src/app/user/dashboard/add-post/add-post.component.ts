import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Route } from '@angular/router';
import { motivationWidgetService } from 'src/app/shared/motivationWidget.service';
import { MotivationWidget } from 'src/app/shared/motivationWidget.model';
import { NgForm } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [UserService]
})
export class AddPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, public UserService: UserService, public motivationWidgetService: motivationWidgetService) { }

  hobby: Hobby = {"name" : ""};
  motivationWidget: MotivationWidget = {"title": ""}

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(response => {
      this.hobby = response;
    });
  }
  
  submitPost(addPostForm: NgForm)
  {
    if(addPostForm.invalid){ return; }

    var todaysDate = new Date();
    this.motivationWidget.postDate = todaysDate;

    this.motivationWidgetService.addPost(this.hobby, this.motivationWidget).subscribe(resp => { });
  }

}
