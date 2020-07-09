import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';

import { environment } from '../environments/environment';
import { ProjectsComponent } from './projects/projects.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ChatDrawerComponent } from './chat-drawer/chat-drawer.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectSettingsDialog } from './project-detail/project-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import { AuthService } from './auth.service';
import { ToggleChatService } from './toggle-chat.service';

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
    MainFeedComponent,
    ProjectSettingsDialog,
    PageNotFoundComponent,
    WorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule,
    CdkScrollableModule,
    TextFieldModule,
  ],
  providers: [
    AuthService,
    ToggleChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
