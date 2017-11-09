import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {UserService} from "./model/user.service";
import {User} from "./model/user";


@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  signin_info: any = {};
  signup_info: any = {};
  signin_response = 0;
  signup_response = 0;
  constructor(
    private router : Router,
    private userService : UserService) {}

  ngOnInit(): void {}

  signin() {
    this.userService
      .signin(this.signin_info.username, this.signin_info.password)
      .then(response => this.signin_response = response);
  }

  signup() {
    this.userService
      .signup(this.signup_info.username, this.signup_info.email, this.signup_info.password)
      .then(response => this.signup_info = response);
  }
}
