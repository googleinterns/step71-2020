import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { Observable, of, Subject } from 'rxjs';


import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles$: Observable<Profile[]>;
  private user: firebase.User;
  private currentUser$: Subject<Observable<Profile>>;

  constructor(
    private firestore: AngularFirestore,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) { 
      this.authService.getProfile().subscribe(user => {
      this.user = user;
      this.profiles$ = firestore.collection<Profile>('users').valueChanges();
    });
   }

    public getProfile(): Observable<Profile[]> {
      return this.profiles$;
  }

  public saveProfile(email: string): Observable<Profile> {
    return this.firestore.collection('users').doc<Profile>(email);
  }

  public getCurrentUser(profile: Profile): Subject<Observable<Profile>>{
    if (this.currentUser$ == null) {
          this.firestore.collection<Profile>('users').doc(profile.email).set(profile)
    .catch(error => console.error("Error adding user: ", error));
    }    
    // else return currentUSer
  }
}
