import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Route[] = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  { path: 'user', component: MainComponent },
  { path: 'admin', component:  AdminComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }