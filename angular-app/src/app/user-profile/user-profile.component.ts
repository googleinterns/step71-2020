import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfileService } from '../profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profiles$: Observable<Profile[]>;
  
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
       this.profiles$ = this.profileService.getUser();
  }

  panelOpenState = false;
}
