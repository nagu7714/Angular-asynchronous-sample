import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  //public notificationSubject$ =new Subject<string>();

  public notificationSubject$ =new BehaviorSubject<string>('Welcome User');

  constructor() { }

  sendNotification(data: string){

    this.notificationSubject$.next(data);

  }
}
