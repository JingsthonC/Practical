import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApiloginComponent } from './components/apilogin/apilogin.component';
import { ApiSignUpComponent } from './components/api-sign-up/api-sign-up.component';
import { AuthGuard } from './services/auth.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: ApiloginComponent},
  {path: 'sign-up', component: ApiSignUpComponent},
  {path: 'admin',
          canActivate: [AuthGuard], 
          loadChildren: () => 
          import('./modules/admin/admin.module').then((m)=>m.AdminModule) },
  {path: '**', component: NotFoundComponent},
];




@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
