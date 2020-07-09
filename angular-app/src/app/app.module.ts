import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsComponent } from './projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ChatDrawerComponent } from './chat-drawer/chat-drawer.component';
import { ToggleChatService } from './toggle-chat.service';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { MainFeedComponent } from './main-feed/main-feed.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    LeftMenuComponent,
    ChatDrawerComponent,
    ProjectDetailComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    DiscoveryComponent,
    MainFeedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
  ],
  providers: [ToggleChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
