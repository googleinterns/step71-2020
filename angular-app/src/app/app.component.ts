import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public user$;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  login() {
    this.authService.login();
  }
}
