import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RegistrationService extends RepositoryService<User> {
  protected endPoint = 'http://localhost:3000/api';

  constructor(
    protected httpClient: HttpClient
    ) {
    super(httpClient);
   }

   // this method is used for adding a user by hitting the backend endpoint to put it into the database
   public add(item: User): Observable<User> {
     const obj = {
       name: item.name,
       email: item.email,
       smuId: item.smuId,
       password: item.password
     };
     console.log('Heehee Did this actually work?? Do I store the correct information')
     return this.httpClient.post<User>(`${this.endPoint}/register`, item, this.httpOptions).do(res => {
      this.setSession(res.id); // will get token from back soon, use user name for now
    }).pipe(
      catchError(this.handleException)
    );
   }
   // this is used for setting the session
  private setSession(authResult: string) {
    localStorage.setItem('id', authResult);
  }
}
