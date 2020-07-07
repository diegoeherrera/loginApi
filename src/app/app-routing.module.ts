import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/login/register/register.component';
import {TestComponentComponent} from './test-component/test-component.component';
import {AuthGuard} from './shared/auth.guard';

const routes: Routes = [
  {path: 'privado', component: TestComponentComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
