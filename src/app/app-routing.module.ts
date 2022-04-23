import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../components/home/home.component"
import { FuelSaverComponent } from "../components/fuel-saver/fuel-saver.component"

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'FuelSaver',
    component: FuelSaverComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
