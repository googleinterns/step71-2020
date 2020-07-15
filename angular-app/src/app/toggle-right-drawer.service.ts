import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class ToggleRightDrawerService {
  private rightDrawer: MatSidenav;

  constructor() { }

  public setRightDrawer(rightDrawer: MatSidenav) {
    this.rightDrawer = rightDrawer;
  }

  public open() {
    return this.rightDrawer.open();
  }

  public close() {
    return this.rightDrawer.close();
  }

  public toggle(): void {
    this.rightDrawer.toggle();
  }
}
