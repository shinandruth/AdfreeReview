import {Component, OnInit} from "@angular/core";
import { Router } from "@angular/router";

import {UserService} from "./model/user.service";
import {User} from "./model/user";
import {RatingService} from "./rating.service";
import {Rating} from "./rating";

@Component({
  selector: 'mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.css'],
})

export class MypageComponent implements OnInit {
  my_info: User;
  index_list = [0, 1, 2, 3];
  domains = ['naver', 'daum', 'egloos', 'tistory'];   // all domains where user can choose to use the service
  setting = [];
  profile = "";
  my_ratings : Rating[];

  constructor(
    private router : Router,
    private userService : UserService,
    private ratingService : RatingService) {}

  ngOnInit(): void {
    this.getMyInfo();
    this.getMyRatings();
  }

  getMyInfo() {
    let prev_setting = []
    this.userService
      .getMyInfo()
      .subscribe((user: User) => {
        this.my_info = user;
        if (user.domain_list !== "")
          prev_setting = user.domain_list.split(',');   // list of domains current user prefer
        for (let i = 0; i < this.domains.length; i++) {
          this.setting
            .push(prev_setting.includes(this.domains[i]));
        }
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

  updateSetting() {
    let new_setting = "";
    for (let i = 0; i < this.domains.length; i++) {
      if (this.setting[i])
        new_setting += this.domains[i] + ",";
    }
    new_setting = new_setting.slice(0, -1);   // delete last ','
    /* update db with new setting */
    this.userService
      .updateSetting(new_setting)
      .subscribe(response => {
        alert("Setting saved");
      }, (err) => {
        alert("HttpResponse: " + err);
      });

    console.log(new_setting.split(','));
  }

  selectProfile(count) {
    if (count < 3) {
      this.profile = "assets/images/heart-1.png"
    }
    else if (count >= 3 && count < 10) {
      this.profile = "assets/images/heart-2.png"
    }
    else {
      this.profile = "assets/images/heart-3.png"
    }
  }

  getMyRatings() {
    this.ratingService
      .getMyRatings()
      .then(my_ratings => {
        this.my_ratings = my_ratings;
        this.selectProfile(my_ratings.length);
      });
  }

  toggleComment(rating) {
    if (rating.show_comment) {
      rating.show_comment = false;
    }
    else {
      rating.show_comment = true;
    }
  }

  isWantedDomain(rating) {
    let url = rating.post_url;
    let domain_index;
    if (url.includes('naver')) {
      domain_index = 0;
    }
    else if (url.includes('daum')){
      domain_index = 1;
    }
    else if (url.includes('egloos')){
      domain_index = 2;
    }
    else if (url.includes('tistory')){
      domain_index = 3;
    }
    else {
      return false;
    }
    return this.setting[domain_index];
  }
}
