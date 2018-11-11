import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { User } from '../models';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import 'rxjs/add/operator/do'



@Injectable()
export class SigninService extends RepositoryService<User> {
  protected endPoint = 'http://localhost:3000/users';
  public user: User;
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

 logIn(email: string, password: string){
   var obj = {
     email: email,
     password: password
   }
   const item = JSON.stringify(obj);
   return this.httpClient.get<User>(`${this.endPoint}`,
      item, this.httpOptions).do(res => {
        this.setSession(res);
      }).pipe(catchError(this.handleException));
  }
  private setSession(authResult: object)
  {
    localStorage.setItem('id', authResult['id']);
    console.log(localStorage.getItem('id'));
  }
  public getId()
{
  const id = localStorage.getItem('id'); 
  console.log(id);
    return id;
}
public logOut()
{
  localStorage.removeItem('expires_at'); 
}
  protected handleException(exception: any) {
    let message = `${exception.status} : ${exception.statusText}\r\n${exception.message}`;
    alert(message);
    return Observable.throw(exception);
  }

 }





