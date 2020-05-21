import {HttpParams} from '@angular/common/http';

export type ShopHttpParams = HttpParams | {
  [param: string]: string | string[] | any;
};
