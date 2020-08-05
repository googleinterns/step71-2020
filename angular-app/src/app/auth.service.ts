import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private afs: AngularFirestore,
  ) { }

  getUser() {
    return this.auth.user;
  }

  login() {
    let googleAuthProvider = new auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({
      prompt: 'consent' // TODO(#70): probably better as 'select_account' when in production
    });
    this.auth.signInWithPopup(googleAuthProvider)
      .then(result => {
        let user = result.user;
        const profileRef = this.afs.firestore.collection('users').doc(user.uid);
        profileRef.get()
          .then(docSnapshot => {
            if (!docSnapshot.exists) {
              profileRef.set({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                bio: "",
                tags: [],
                following: [],
                snippets: [],
              }).then(() => console.log("New user profile created"))
                .catch(() => console.log("Error encountered when creating new profile"));
            }
          });
      });
  }

  logout() {
    this.auth.signOut();
  }
}
