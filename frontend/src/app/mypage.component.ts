import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {UserService} from "./model/user.service";
import {User} from "./model/user";

@Component({
  selector: 'mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
})

export class MypageComponent implements OnInit {
  my_info: User;
  all_domain_list: string[] = ['naver', 'daum', 'egloos', 'tistory'];
  my_domain_list: string[];
  constructor(
    private router : Router,
    private userService : UserService) {}

  ngOnInit(): void {
    this.getMyInfo();
  }

  getMyInfo() {
    this.userService
      .getMyInfo()
      .subscribe((user: User) => {
        this.my_info = user;
        this.my_domain_list = user.domain_list.split(',');
      }, (err) => {
        if (err === 'Unauthorized') {
          alert("Please login to access My Page!");
          this.router.navigate(['/welcome']);
        }
        else {
          alert("Http Response: " + err);
        }
      });
  }

  isDomain(domain) {
    return this.all_domain_list.includes(domain);
  }
}
