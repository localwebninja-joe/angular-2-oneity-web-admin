import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent, RegisterPageComponent } from '@app/auth/containers';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent, data: { title: 'Login' } },
  { path: 'register', component: RegisterPageComponent, data: { title: 'Register' } },
  { path: 'join', component: RegisterPageComponent, data: { title: 'Join' } },
  // This is what I meant you to do. so for now I just use the RegisterPageComponent so that the 404 will not display
  // You need to do this steps:
  // Replace the RegisterPageComponent to JoinPageComponent
  // You need to create JoinPageComponent component to handle the http client request 
  // you will need to get the ref value
  /**
   * const urlParams = new URLSearchParams(window.location.search);
   * const myParam = urlParams.get('ref'); // the value is binomical
   */
  // once you get the value you have to dispatch with this url
  // https://svc.binomical.com/join?ref={myParam}
  // after request is done you will force the redirect to url
  // https://svc.binomical.com/register
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
