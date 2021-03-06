import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagFilterPipe} from './filter.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule, MAT_CHIPS_DEFAULT_OPTIONS, MatChipsDefaultOptions } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule, MAT_TABS_CONFIG } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

import { environment } from '../environments/environment';
import { ProjectsComponent } from './projects/projects.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { CreateProjectDialogComponent } from './create-project-dialog/create-project-dialog.component';
import { ChatDrawerComponent } from './chat-drawer/chat-drawer.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ManageCollaboratorsComponent } from './manage-collaborators/manage-collaborators.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DiscoveryComponent } from './discovery/discovery.component';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { WorkspaceComponent } from './workspace/workspace.component';

import { AuthService } from './auth.service';
import { ProfileService } from './profile.service';
import { ProjectService } from './project.service';
import { ManageTagsComponent } from './manage-tags/manage-tags.component';

@NgModule({
  declarations: [
    AppComponent,
    TagFilterPipe,
    ProjectsComponent,
    LeftMenuComponent,
    ChatDrawerComponent,
    CreateProjectDialogComponent,
    ConfirmationDialogComponent,
    ManageCollaboratorsComponent,
    ProjectDetailComponent,
    UserProfileComponent,
    DiscoveryComponent,
    MainFeedComponent,
    PageNotFoundComponent,
    WorkspaceComponent,
    ManageTagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    MatToolbarModule,
    CdkScrollableModule,
    TextFieldModule,
    NgxAudioPlayerModule,
  ],
  providers: [
    AuthService,
    ProfileService,
    ProjectService,
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ ENTER, COMMA ]
      } as MatChipsDefaultOptions
    },
    {
      provide: MAT_TABS_CONFIG,
      useValue: {
        animationDuration: '0ms'
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
