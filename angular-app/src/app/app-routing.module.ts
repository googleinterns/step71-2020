import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiscoveryComponent } from './discovery/discovery.component';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { ProjectsComponent } from './projects/projects.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkspaceComponent } from './workspace/workspace.component';



const routes: Routes = [
  { path: 'discover', component: DiscoveryComponent },
  { path: 'main-feed', component: MainFeedComponent },
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'workspace/:id', component: WorkspaceComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
