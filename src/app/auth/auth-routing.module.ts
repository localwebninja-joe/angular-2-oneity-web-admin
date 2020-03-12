import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent } from '@app/auth/containers';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterPageComponent, data: { title: 'Register' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
