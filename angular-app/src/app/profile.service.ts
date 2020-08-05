import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as firebase from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore';

import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  public getProfile(uid: string): Observable<Profile> {
    return this.firestore.collection('users').doc<Profile>(uid).valueChanges();
  }

  public saveProfile() {
  }
}
