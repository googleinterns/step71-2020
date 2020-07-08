import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkspaceComponent } from './workspace/workspace.component';



const routes: Routes = [
  { path: 'projects/:id', component: ProjectDetailComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
