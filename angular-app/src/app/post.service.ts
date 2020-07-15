import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts$: Observable<Post[]>;

  constructor(private firestore: AngularFirestore) {
      this.posts$ = firestore.collection<Post>('posts').valueChanges();
   }

  public getPosts(): Observable<Post[]> {
      return this.posts$;
  }

}
