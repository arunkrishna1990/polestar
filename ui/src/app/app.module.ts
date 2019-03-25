import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ScreeningProfilesComponent } from './components/screening-profiles/screening-profiles.component';
import { EffectsModule } from '@ngrx/effects';
import { ScreeningProfilesEffects } from './core/store/screening-profiles';
import { environment } from 'src/environments/environment';
import { FilterControlComponent } from './components/screening-profiles/filter-control/filter-control.component';
import { ScreeningProfileDetailsComponent } from './components/screening-profiles/screening-profile-details/screening-profile-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ScreeningProfilesComponent,
    SideBarComponent,
    FilterControlComponent,
    ScreeningProfileDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ScreeningProfilesEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ScreeningProfileDetailsComponent]
})
export class AppModule { }
