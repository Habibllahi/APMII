import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { UserRouteModule } from './user-route.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    UserRouteModule
  ],
  exports: [
    LoginComponent
  ]
})
export class UserModule { }
