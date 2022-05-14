import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-contact',
  template: `
    <p>
      Enther Message: <input type="text" #message />
      <button (click)="sendMessage(message)">Send Message</button>

      Current Message is : {{currentMessage}}
    </p>
  `,
  styles: [
  ]
})
export class ContactComponent implements OnInit {

  currentMessage:string | undefined;

  constructor(private notifcationService: NotificationService) { }

  ngOnInit(): void {

    this.notifcationService.notificationSubject$.subscribe(d=>{
      this.currentMessage=d;
    })
  }

  sendMessage(data: HTMLInputElement){

 this.notifcationService.sendNotification(data.value);

  }

}
