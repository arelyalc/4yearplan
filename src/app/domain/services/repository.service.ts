import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models';

@Injectable()
export abstract class RepositoryService<T> {

protected endPoint = 'http://localhost:3004/users';

constructor(protected httpClient: HttpClient) { }

protected httpOptions =
{
    headers: new HttpHeaders({
        'Content-Type' : 'application/json'
    })
};
public add(item: T): Observable<T> {
  return this.httpClient.post<T>(`${this.endPoint}`, item, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}

getById(id: number): Observable<User> {
  return this.httpClient
  .get<User>(`${this.endPoint}/${id}`, this.httpOptions)
  .pipe(catchError(this.handleException));
}

update(updatedUser: User): Observable<User> {
  return this.httpClient
  .put<User>(`${this.endPoint}/${updatedUser.id}`, updatedUser, this.httpOptions)
  .pipe(catchError(this.handleException));
}

public delete(id: number): Observable<T> {
  return this.httpClient.delete<T>(`${this.endPoint}/${id}`, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}
protected handleException(exception: any) {
  const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
  alert(message);
  return Observable.throw(exception);
}

}
