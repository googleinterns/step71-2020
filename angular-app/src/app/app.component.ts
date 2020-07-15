import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

import { ToggleRightDrawerService } from './toggle-right-drawer.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked {

  @ViewChild('rightDrawer') public rightDrawer: MatSidenav;
  public user$;

  constructor(
    private authService: AuthService,
    private toggleRightDrawerService: ToggleRightDrawerService
  ) { }

  ngOnInit(): void {
    this.user$ = this.authService.getUser();
  }

  ngAfterViewChecked(): void {
    this.toggleRightDrawerService.setRightDrawer(this.rightDrawer);
  }

  login() {
    this.authService.login();
  }
}
