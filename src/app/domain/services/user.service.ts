import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from './repository.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService extends RepositoryService<User>{
  protected endPoint = 'http://localhost:3000/user';
  public user: User;
constructor(protected httpClient: HttpClient) { 
  super(httpClient);
}

public getById(id: number): Observable<User> {
  return this.httpClient.get<User>(`${this.endPoint}/${id}`, this.httpOptions).pipe(
    catchError(this.handleException)
  );
}
public updatePassword(item: User, id: number): Observable<User>{
  var obj = {
      studentID: item.studentID,
      password: item.password,
      email: item.email
  }
  console.log(obj.password);
  console.log(obj);
  const user = item.serialize(obj);
  console.log(user);
  return this.httpClient.put<User>(`${this.endPoint}/${id}`, user, this.httpOptions).pipe(
      catchError(this.handleException)
    );
}
public delete(id: number): Observable<User>
    {
        return this.httpClient.delete<User>(`${this.endPoint}/${id}`, this.httpOptions).pipe(
            catchError(this.handleException)
          );
    }
protected handleException(exception: any) {
  let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
  alert(message);
  return Observable.throw(exception);
}

}
