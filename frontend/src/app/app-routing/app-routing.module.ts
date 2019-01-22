import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { SelectivePreloadStrategy } from './SelectivePreloadStrategy';
import { AuthGuardService } from '../user/auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'player',
    canActivate: [ AuthGuardService ],
    loadChildren: 'app/player/player.module#PlayerModule',
    data: { preload: true }
  },
   { path: '', redirectTo: 'player/list', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {
        preloadingStrategy: SelectivePreloadStrategy
      })
  ],
  providers: [SelectivePreloadStrategy],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }