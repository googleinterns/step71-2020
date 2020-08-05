import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
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
    private authService: AuthService,
    private profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.profile$ = this.profileService.getProfile(user.uid);
    });
  }

}
