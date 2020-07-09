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
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }
}
