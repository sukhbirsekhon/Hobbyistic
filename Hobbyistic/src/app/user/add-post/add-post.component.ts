import { Component, OnInit } from '@angular/core';
import { Hobby } from 'src/app/shared/hobby.model';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Route, RouterLink } from '@angular/router';
import { motivationWidgetService } from 'src/app/shared/motivationWidget.service';
import { MotivationWidget } from 'src/app/shared/motivationWidget.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [UserService]
})
export class AddPostComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, public UserService: UserService, public motivationWidgetService: motivationWidgetService) { }

  hobby: Hobby = {"name" : ""};
  motivationWidget: MotivationWidget = {"title": "", "description": "", "sharable": false}
  file: File = {"name": ""} as File
  fileName = "";
  warning = false;
  dataFile: any;

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(response => {
      this.hobby = response;
    });
  }
  
  submitPost(addPostForm: NgForm)
  {
    if(addPostForm.invalid){ return; }
    if(this.fileName = ""){ this.warning = true; return;}
    var todaysDate = new Date();
    this.motivationWidget.postDate = todaysDate;
    console.log(this.motivationWidget);
    console.log(this.file);
    this.motivationWidgetService.uploadPost(this.hobby, this.motivationWidget, this.file).subscribe();
    //this.router.navigate(['/motivation/', this.hobby.id]);
  }

  onFileSelected(event: any)
  {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
      console.log(this.fileName);
      const reader = new FileReader();
      this.dataFile = reader.readAsDataURL(this.file);
  }

}
