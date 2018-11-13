import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models';
import { Plan } from '../models/plan';

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

public add(item: T): Observable<T> {
  return this.httpClient.post<T>(`${this.endPoint}/users`, item, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}

getById(id: number): Observable<User> {
  return this.httpClient
  .get<User>(`${this.endPoint}/users/${id}`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

update(updatedUser: User): Observable<User> {
  return this.httpClient
  .put<User>(`${this.endPoint}/users/${updatedUser.id}`, updatedUser, this.httpOptions)
  .pipe(catchError(this.handleException));
}

savePlan(id: string, updatedPlan: Plan): Observable<Plan> {
  const obj = {
    id: id,
    plan: updatedPlan
  };
  return this.httpClient
  .post<Plan>(`${this.endPoint}/saveCurrentPlan`, obj, this.httpOptions)
  .pipe(catchError(this.handleException));
}

getPlans(id: string): Observable<Plan[]> {
  return this.httpClient
  .get<Plan[]>(`${this.endPoint}/savedPlans`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

sendTaken(id: string, taken: string[]): Observable<Plan[]> {
  const obj = {
    id: id,
    taken: taken
   };
   return this.httpClient
   .put<Plan[]>(`${this.endPoint}/prevCredit`, obj, this.httpOptions)
   .pipe(catchError(this.handleException));
}

public delete(id: number): Observable<T> {
  return this.httpClient.delete<T>(`${this.endPoint}/${id}`, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}

// using this route for testing along with db.json
// remove later

getPlan(id: number): Observable<Plan> {
  return this.httpClient
  .get<Plan>(`${this.endPoint}/4yearplan/?studentID=${id}`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

protected handleException(exception: any) {
  const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
  alert(message);
  return Observable.throw(exception);
}

}
