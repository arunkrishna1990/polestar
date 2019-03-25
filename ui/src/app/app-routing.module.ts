import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreeningProfilesComponent } from './components/screening-profiles/screening-profiles.component';

const routes: Routes = [{
  path: 'screeningProfiles', component: ScreeningProfilesComponent
}, {
  path: '', pathMatch: 'full', redirectTo: '/screeningProfiles'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
