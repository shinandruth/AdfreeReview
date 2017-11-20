import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {UserService} from "./model/user.service";


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  signin_info: any = {};
  signup_info: any = {};
  constructor(
    private router : Router,
    private userService : UserService) {}

  ngOnInit(): void {}

  signin() {
    this.userService
      .signin(this.signin_info.username, this.signin_info.password)
      .then(status => {
        if (status == 200) {
          this.router.navigate(['/main']);
        }
        else if (status == 401) {
          alert("Incorrect username or password.");
        }
        else {
          alert("HttpResponse: " + status);
        }
      });
  }

  signup() {
    this.userService
      .signup(this.signup_info.username, this.signup_info.email, this.signup_info.password)
      .then(status => {
        if (status == 201) {
          alert("You are successfully signed up!. Welcome. Please login.")
        }
        else {
          alert("HttpResponse: " + status);
        }
      });
  }
}
