import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncSubject, BehaviorSubject, filter,  Observable, ReplaySubject, Subject, Subscription , } from 'rxjs';
import{ajax} from 'rxjs/ajax';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,  OnDestroy {
  private mysubscription!: Subscription;
  title = 'Angular rxjs';
  //apiUrl = 'https://www.techiediaries.com/api/data.json'; 
  apiUrl= 'https://jsonplaceholder.typicode.com/users';
   data:any;

  constructor(private httpClient: HttpClient){}
  
  
 ngOnInit(): void {


  //this.getPromise();

  //this.getObservable();

  //this.getObservableUnicast();

  //this.getSubjectMulticast();

  //this.getDataUsingAjax();
 // this.getSubjectTypes();
 
 }

 ngOnDestroy(): void {
   //cancel observable
  // this.mysubscription.unsubscribe();
 }

 /*Eager
return only on value
cannot cancel
*/
 getPromise(){
  const promise=new Promise(resolve=>{
    console.log('Promise call.....');
    setTimeout(() => {
      resolve('Promise Working');
      resolve('Promise Working1');
      resolve('Promise Working2');
      resolve('Promise Working3');
    }, 1000);
  })

  promise.then(res => console.log(res));
 }

/*Lazy
return multiple values
can cancel
observables are unicast
*/
 getObservable(){

  const observable= new Observable(subscribe=>{
    console.log('Observable call.....');
   
    //return multiple values
    setTimeout(() => {
      subscribe.next("Observable Working");
     subscribe.next("Observable Working1");
      subscribe.next("Observable Working2");
      subscribe.next("Observable Working3");
     }, 1000);
  
     
  observable.pipe(
   filter(val=>val === 'Observable Working3')).subscribe(result=> console.log(result));
   this.mysubscription= observable.subscribe(result=> console.log(result));

 });


}

getObservableUnicast(){
   
 //unicast -- for each subscriber new execution happen.cannot share the same value to all subscriber. one to one 
 const observableunicast = new Observable(obj=> obj.next(Math.random()));

 //subscriber 1
 observableunicast.subscribe(d=> console.log(d));

 //subscriber 2
 observableunicast.subscribe(d=> console.log(d));
}

getSubjectMulticast(){
  //multicast  - subject act as a data provided
const subject= new Subject();

//subscriber 1
subject.subscribe(d=> console.log(d));

//subscriber 2

subject.subscribe(d=> console.log(d));

subject.next(Math.random());

}

getDataUsingAjax(){

  // issue with this approach is will make 2 ajax call for 2 subscribers.
  //Observable
 /* const data= ajax(this.apiUrl);

//subscriber 1
  data.subscribe(d=>console.log(d));
//subscriber 2
  data.subscribe(d=>console.log(d));*/

//Subject
   
  const subject=new Subject();
  const data =ajax(this.apiUrl);
  
  //subscriber 1
  subject.subscribe(d=> console.log(d));
  //subscriber 2
  subject.subscribe(d=> console.log(d));
// the below line converts unicast into multicast
  const rsult=data.subscribe(subject);


}

getSubjectTypes()
{
   
  const subject=new Subject();

//subscriber 1
   subject.subscribe(d=>console.log('Subject value for subscriber 1 = ' + d));
//subscriber 2
   subject.next(2020);

   subject.subscribe(d=>console.log('Subject value for subscriber 2 = ' + d));

   subject.next(200);

  //Behavior Subject
  // it holdes initial value where as Subject doesnt have any intial value. new subscriber will get last emitted value

  const bSubject=new BehaviorSubject<number>(2020);
//subscriber 1
  bSubject.subscribe(d=>console.log('Behavior Subject value for subscriber 1 = ' + d));

  bSubject.next(2021);
//subscriber 2
  bSubject.subscribe(d=>console.log('Behavior Subject value for subscriber 2 = ' + d));

  bSubject.next(2022);

  //subscriber 3
  bSubject.subscribe(d=>console.log('Behavior Subject value for subscriber 3 = ' + d));


  //Replay subject- doesnt have any initial value and its buffers old values
  // param buffersize holds number of previous values for the new subscribers.

  const rSubject=new ReplaySubject(2);
  
  //subscriber 1
  rSubject.subscribe(d=>console.log('Replay Subject value for subscriber 1 = ' + d));
    

  rSubject.next('hello!');
  rSubject.next('how are u? ');
  rSubject.next('where are u from? ');
  rSubject.next('good night.');


//subscriber 2
rSubject.subscribe(d=>console.log('Replay Subject value for subscriber 2 = ' + d));


/* Async Subject only emits latest value when it is completes.*/

const asyncSubject = new AsyncSubject();


//subscriber 1
asyncSubject.subscribe(d=>console.log('Async Subject value for subscriber 1 = ' + d));

  bSubject.next(2021);
//subscriber 2
asyncSubject.subscribe(d=>console.log('Async Subject value for subscriber 2 = ' + d));

asyncSubject.next(2022);

  //subscriber 3
  asyncSubject.subscribe(d=>console.log('Async Subject value for subscriber 3 = ' + d));

  asyncSubject.complete();
  
}
 
}


