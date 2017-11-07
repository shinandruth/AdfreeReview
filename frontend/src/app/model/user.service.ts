import { Injectable } from '@angular/core';
import {Headers, Http} from "@angular/http";
import {User} from "./user";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private signinUrl = '/api/signin';
  private signupUrl = '/api/signup';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  signin(username: string, password: string) : Promise<number> {
    return this.http
      .post(this.signinUrl, JSON.stringify({ username: username, password: password }))
      .toPromise()
      .then(response => response.status as number)
      .catch(this.handleError);
  }

  signup(username: string, email: string, password: string) : Promise<number> {
    return this.http
      .post(
        this.signupUrl,
        JSON.stringify({ username: username, email: email, password: password }),
        this.headers)
      .toPromise()
      .then(response => response.status as number)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
