import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

import {of} from 'rxjs';
import {Observable} from 'rxjs';
import {ShopService} from '../services/shop.service';
import {User} from '../interfaces/user.interface';
import {UserToken} from '../interfaces/user-token.interface';

@Injectable()
export class AuthGuard {
  public constructor(
    private _shopService: ShopService,
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    let isToken: boolean = false;
    this._shopService.user$.subscribe((user: UserToken) => {
      isToken = !!user.token;
    });
    return of(isToken);
  }


}
