import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profiles$: Observable<Profile[]>;

  constructor(private firestore: AngularFirestore) { 
     this.profiles$ = firestore.collection<Profile>('users').valueChanges();
   }

  public getUser(): Observable<Profile[]> {
    return this.profiles$;
  }

}

//getCurrentUser