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

   public add(item: User): Observable<User>
   {
     var obj = {
       name: item.name,
       email: item.email,
       smuId: item.smuId,
       password: item.password
     }
     //const user = item.serialize(obj)
     //console.log(user)
     return this.httpClient.post<User>(`${this.endPoint}/register`, item, this.httpOptions).pipe(
      catchError(this.handleException)
    );
   }

}
