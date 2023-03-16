import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Hobby } from 'src/app/shared/hobby.model';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/shared/message.model';
import { WidgetsService } from 'src/app/shared/widgets.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.css'],
  providers: [UserService]
})
export class AssistantComponent implements OnInit {
  
  loading = false;
  hobby: Hobby = {"name" : ""};
  messages: Message[] = [];
  newMessage: Message = {role: 'user', content: '', date: new Date()};

  constructor(private UserService: UserService, private WidgetService: WidgetsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.hobby.id = this.route.snapshot.params['id'];
    this.UserService.GetSingleHobby(this.hobby).subscribe(response => {
      this.hobby = response;
    });
    this.WidgetService.getAssistantMessageHistory(this.hobby).subscribe(response => {
      this.messages = response;
    })
  }

  onSubmit(): void {
    this.loading = true;
    const newMessageContent = this.newMessage.content;
    this.newMessage.content = '';
    this.messages.push({ role: 'user', content: newMessageContent, date: new Date()});
    this.WidgetService.getAssistantResponseAndMessage(this.hobby, {role: 'user', content: newMessageContent, date: new Date()}).subscribe(response => {
      console.log('rolling')
      this.messages.push({ role: 'assistant', content: response.message, date: new Date()});
      this.loading = false;
    });
    console.log('woof');
    this.newMessage.content = '';
  }
}
