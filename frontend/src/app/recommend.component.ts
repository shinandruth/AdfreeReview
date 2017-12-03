import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

import {UserService} from "./model/user.service";
import {User} from "./model/user";
import {Post} from "./post";
import {PostService} from "./post.service";

@Component({
  selector: 'recommend',
  templateUrl: './recommend.component.html',
  styleUrls: ['./recommend.component.css'],
})

export class RecommendComponent implements OnInit {
	constructor(
		private router: Router,
    		private postService: PostService,
    		private userService: UserService) { }

	ngOnInit(): void {
		
		this.postService.get_recommended_posts('DEFAULT CATEGORY')
        	.then(posts => this.posts = posts);

	}

	posts: Post[];

	

}	