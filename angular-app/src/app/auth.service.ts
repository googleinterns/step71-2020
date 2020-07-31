import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth) { }

  getUser() {
    return this.auth.user;
  }

  login() {
    let googleAuthProvider = new auth.GoogleAuthProvider();
    googleAuthProvider.setCustomParameters({
      prompt: 'consent' // TODO(#70): probably better as 'select_account' when in production
    });
    this.auth.signInWithRedirect(googleAuthProvider);
  }

  logout() {
    this.auth.signOut();
  }
}
