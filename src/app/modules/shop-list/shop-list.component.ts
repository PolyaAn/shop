import { Component, OnInit } from '@angular/core';
import {ShopService} from '../../entities/services/shop.service';
import {Observable} from 'rxjs';
import {UserToken} from '../../entities/interfaces/user-token.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../entities/interfaces/product.interface';

@Component({
  selector: 'app-shop-list',
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.css']
})
export class ShopListComponent implements OnInit {

  public myGroup = new FormGroup({
    name: new FormControl(''),
    count: new FormControl(0),
    price: new FormControl(0),
  });

  constructor(
    private _service: ShopService
  ) {
  }

  public user$: Observable<UserToken> = this._service.user$;
  public products$: Observable<Product[]> = this._service.products$;

  ngOnInit(): void {
    this._service.GetProducts();
  }

  public add(): void {
    this._service.addProduct(this.myGroup.getRawValue());
  }

  public delete(id: string): void {
    this._service.deleteProduct(id);
  }
}
