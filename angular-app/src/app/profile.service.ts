import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private user: firebase.User;
  private currentProfile$: Observable<Profile>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
  ) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.user != null) {
        this.currentProfile$ = this.getProfile(this.user.uid);
      }
    });
  }

  public getProfile(uid: string): Observable<Profile> {
    return this.firestore.collection('users').doc<Profile>(uid).valueChanges();
  }

  public getCurrentProfile(): Observable<Profile> {
    return this.currentProfile$;
  }

  public saveProfile() {
  }
}
