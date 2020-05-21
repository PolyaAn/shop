import {AppComponent} from './app.component';
import {Route} from '@angular/router';
import {AuthGuard} from './entities/guards/auth.guard';
import {LoginComponent} from './modules/login/login.component';
import {RegistrationComponent} from './modules/login/entities/components/registration/registration.component';
import {ShopListComponent} from './modules/shop-list/shop-list.component';

export const appRoutes: Route[] = [
  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'shop',
        component: ShopListComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: '/login'
      }
    ]
  }
];
