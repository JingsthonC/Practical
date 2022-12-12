import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from 'src/app/components/add-user/add-user.component';
import { UserDashboardComponent } from 'src/app/components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
      path: '', 
      component: UserDashboardComponent, 
      children: [
        {path: 'dashboard', component: UserDashboardComponent},
        {path: 'addUser', component: AddUserComponent},
        {path: '', redirectTo: '/admin/dashboard', pathMatch: 'full'}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
