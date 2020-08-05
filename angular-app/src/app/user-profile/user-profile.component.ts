import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfileService } from '../profile.service';
import { Profile } from '../profile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile$: Observable<Profile>;
  
  constructor(
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.profile$ = this.profileService.getCurrentProfile();
  }

}
