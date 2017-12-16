export class Rating {
	id: number;
	post_id: number;
	post_title: string;
	post_url: string;
	user_id: number;
	time_stamp : string;
	adfree_score: number;
	content_score: number;
	comment : string;
	show_comment : boolean = false;
}
