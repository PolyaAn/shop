import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ShopService} from './entities/services/shop.service';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {LoginModule} from './modules/login/login.module';
import {ShopListModule} from './modules/shop-list/shop-list.module';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DialogMessageComponent } from './entities/components/dialog-message/dialog-message.component';
import {AuthGuard} from './entities/guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    DialogMessageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    BrowserAnimationsModule,
    HttpClientModule,
    LoginModule,
    ShopListModule,
  ],
  providers: [
    ShopService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
