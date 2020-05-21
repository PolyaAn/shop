import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ShopService} from '../../../../../entities/services/shop.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public myGroup = new FormGroup({
    login: new FormControl()
  });

  constructor(
    private _service: ShopService,
  ) {
  }

  ngOnInit(): void {
  }

  public registration(): void {
    this._service.registrationOfUser(this.myGroup.getRawValue().login);
  }
}
