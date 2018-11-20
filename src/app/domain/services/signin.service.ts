import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/do';

@Injectable()
export class SigninService extends RepositoryService<User> {
  protected endPoint = 'http://localhost:3000/api/login';
  protected endPoint2 = 'http://localhost:3000/api/user';
  protected endPoint3 = 'http://localhost:3000/api/users';
  public user: User;
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  // this is used for login
  // given the user's smuId and password
  // we use session tracking and we validate the password on backend
  logIn(smuId: number, password: string) {
    const obj = {
      smuId: smuId,
      password: password
    };
    const item = JSON.stringify(obj);
    return this.httpClient.post<string>(`${this.endPoint}`,
      obj, this.httpOptions).do(res => {
          this.setSession(res); // will get token from back soon, use user name for now
        }).pipe(catchError(this.handleException));
  }

  // this is used for setting the session
  private setSession(authResult: string) {
    localStorage.setItem('id', authResult);
  }

  // this is used for getting the user's id once they're logged in
  public getId() {
    const id = localStorage.getItem('id');
    return id;
  }

  // this method is used for retrieving a user by id
  public getById(id: string ): Observable<User> {
    console.log(id)
    return this.httpClient
    .get<User>(`${this.endPoint2}/${id}`, this.httpOptions)
    .pipe(catchError(this.handleException));
  } 

  //Update information for the user
  public updateInformation(item: User, id: string): Observable<User>{
    var obj = {
        email: item.email, 
        password: item.password,
        name: item.name,
        smuId: item.smuId
    }

    //const user = item.serialize(obj);
    return this.httpClient.put<User>(`${this.endPoint3}/${id}`, obj, this.httpOptions).pipe(
        catchError(this.handleException)
      );
}


  // this is used for logging out
  public logOut() {
    localStorage.removeItem('id');
  }

  protected handleException(exception: any) {
    const message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }

 }
