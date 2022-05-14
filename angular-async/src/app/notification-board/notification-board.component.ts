import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-board',
  template: `
    <p>
      Notification : {{notificationMessage}}
    </p>
  `,
  styles: [
  ]
})
export class NotificationBoardComponent implements OnInit {

notificationMessage:string | undefined;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notificationSubject$.subscribe(d=>{
      this.notificationMessage=d;
    })
  }

}
