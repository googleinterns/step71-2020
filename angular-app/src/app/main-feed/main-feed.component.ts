import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostService } from '../post.service';
import { Post } from '../post';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.css']
})
export class MainFeedComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
   }

  ngOnInit() {
      this.posts$ = this.postService.getPosts();
  }

  msbapTitle = 'Audio Title';
  msbapAudioUrl = 'Link to audio URL';   
   
  msbapDisplayTitle = false; 
  msbapDisplayVolumeControls = true;
}
