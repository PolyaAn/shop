import { Component, OnInit } from '@angular/core';
import {ShopService} from '../../services/shop.service';
import {Observable} from 'rxjs';
import {DialogMassage} from '../../interfaces/dialog-massage.interface';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.css']
})
export class DialogMessageComponent implements OnInit {

  constructor(
    private _service: ShopService
  ) {
  }

  public message: Observable<DialogMassage>;
  public display: boolean = false;

  ngOnInit(): void {
    this.message = this._service.dialogMessage.asObservable();

    this.message.subscribe((text) => {
      if (text) {
        this.display = true;
        setTimeout(() => {
          this.display = false;
        }, 2000);
      }
    });
  }

}
