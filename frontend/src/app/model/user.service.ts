import { Injectable } from '@angular/core';
import {Headers, Http, Response} from "@angular/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UserService {
  private signinUrl = '/api/signin';
  private signupUrl = '/api/signup';
  private signoutUrl = '/api/signout';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  signin(username: string, password: string) : Observable<Response> {
    return this.http
      .post(this.signinUrl, JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        return response;
      })
      .catch(err => {
        if (err.status === 401) {
          return Observable.throw('Unauthorized');
        }
        else {
          return Observable.throw(err.status);
        }
      });
  }

  signup(username: string, email: string, password: string) : Observable<Response> {
    return this.http
      .post(
        this.signupUrl,
        JSON.stringify({ username: username, email: email, password: password }),
        this.headers)
      .map((response: Response) => {
        return response;
      })
      .catch(err => {
        return Observable.throw(err.status);
      });
  }

  signout() : Observable<Response> {
    return this.http
      .get(this.signoutUrl)
      .map((response: Response) => {
        return response;
      })
      .catch(err => {
        return Observable.throw(err.status);
      });
  }
}
