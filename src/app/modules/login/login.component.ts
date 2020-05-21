import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RegistrationComponent} from './entities/components/registration/registration.component';
import {MatDialog} from '@angular/material/dialog';
import {ShopService} from '../../entities/services/shop.service';
import {Router} from '@angular/router';
import {UserToken} from '../../entities/interfaces/user-token.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myGroup = new FormGroup({
    login: new FormControl(),
  });

  constructor(
    private _service: ShopService,
    private _router: Router,
  ) {
  }


  public ngOnInit(): void {
    this._service.ClearUser();
  }


  public login(): void {
    this._service.GetUserInformation(this.myGroup.getRawValue().login);
    this._service.user$.subscribe((user: UserToken) => {
      if (user.token !== null) {
        this._router.navigate(['/shop']);
      }
    });
  }

}
