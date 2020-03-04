import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) }, {
    path: 'client', loadChildren: () => import('./pages/client/client.module').then(m => m.ClientPageModule)
  },
  { path: 'client-detail', loadChildren: () => import('./pages/client-detail/client-detail.module').then(m => m.ClientDetailPageModule) },
  { path: 'new-client', loadChildren: () => import('./pages/client/partials/new-client/new-client.module').then(m => m.NewClientPageModule) }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
