import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models';
import { Plan } from '../models/plan';
import { Course } from '../models/course';

@Injectable()
export abstract class RepositoryService<T> {

protected endPoint = 'http://localhost:3000/api';

constructor(protected httpClient: HttpClient) { }

protected httpOptions =
{
    headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
};

// this method is used for adding
public add(item: T): Observable<T> {
  return this.httpClient.post<T>(`${this.endPoint}/users`, item, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}

// this method is used for retrieving a user by id
getById(id: number): Observable<User> {
  return this.httpClient
  .get<User>(`${this.endPoint}/users/${id}`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

// this method is used for updating a user's profile information
update(updatedUser: User): Observable<User> {
  return this.httpClient
  .put<User>(`${this.endPoint}/users/${updatedUser.id}`, updatedUser, this.httpOptions)
  .pipe(catchError(this.handleException));
}

// this method is used for saving a plan for a certain user
// given a plan and the user's id
saveCurrentPlan(userId: string, plan: Plan): Observable<Plan> {
  const obj = {
    plan: plan,
    userId: userId
  };
  console.log(obj);
  return this.httpClient
  .post<Plan>(`${this.endPoint}/saveCurrentPlan`, obj, this.httpOptions)
  .pipe(catchError(this.handleException));
}

// this method is used for getting all of the user's plans
// given a user id
getPlans(id: string): Observable<Plan[]> {
  console.log(id);
  return this.httpClient
  .get<Plan[]>(`${this.endPoint}/savedPlans/${id}`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

// this method is used for sending the taken classes array to backend
// so that we don't add those classes to the 4-year plan
// given the taken-classes array and a user id
sendTaken(id: string, taken: string[]): Observable<Plan[]> {
  const obj = {
    id: id,
    taken: taken
   };
   return this.httpClient
   .put<Plan[]>(`${this.endPoint}/prevCredit`, obj, this.httpOptions)
   .pipe(catchError(this.handleException));
}

// this method is used for deleting
public delete(id: number): Observable<T> {
  return this.httpClient.delete<T>(`${this.endPoint}/${id}`, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}

getCourses(): Observable<Course[]> {
  return this.httpClient.get<Course[]>(`${this.endPoint}/courses`, this.httpOptions).pipe(
    catchError(this.handleException));
}

// this method is used for generating a specific plan - used for displaying a plan when they click on it
// given a user id
genPlan(id: string): Observable<Plan> {
  return this.httpClient
  .get<Plan>(`${this.endPoint}/genPlan/${id}`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

protected handleException(exception: any) {
  const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
  alert(message);
  return Observable.throw(exception);
}

}
