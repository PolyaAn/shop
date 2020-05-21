import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../interfaces/user.interface';
import {Product} from '../interfaces/product.interface';
import {UserToken} from '../interfaces/user-token.interface';
import {ApiResponse} from '../interfaces/api-response.interface';
import {ShopHttpParams} from '../interfaces/http-params.interface';
import {BehaviorSubject, Observable} from 'rxjs';
import {DialogMassage} from '../interfaces/dialog-massage.interface';


@Injectable()
export class ShopService {

  private _user$: BehaviorSubject<UserToken> = new BehaviorSubject<UserToken>({
    customer: null,
    token: null
  });
  public get user$(): Observable<UserToken> {
    return this._user$;
  }

  private _products$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public get products$(): Observable<Product[]> {
    return this._products$;
  }

  private _url: string = 'http://localhost:5000';
  public get url(): string {
    return this._url;
  }

  public constructor(
    private http: HttpClient,
  ) {
  }

  private _headers;

  public dialogMessage: BehaviorSubject<DialogMassage> = new BehaviorSubject<DialogMassage>(null);

  /**
   * Создание нового пользователя
   * @returns {Observable<UserToken>}
   * @param enterLogin
   */
  public registrationOfUser(enterLogin: string): void {
    // tslint:disable-next-line:max-line-length
    this.http.post<ApiResponse<UserToken>>(`${this._url}/api/Customers`, {login: enterLogin}).toPromise().then((response: ApiResponse<UserToken>) => {
      if (response.success === true) {
        this._user$.next(response.result);
        this._headers = new HttpHeaders({Authorization: 'Bearer ' + response.result.token});
        this.dialogMessage.next({text: 'Регистрация прошла успешно', successOfResponse: response.success});
      } else {
        this.dialogMessage.next({text: response.reason, successOfResponse: response.success});
      }
    });
  }

  /**
   * Получение списка товаров пользователя по его Id
   * @returns {Observable<Product[]>}
   */
  public GetProducts(): void {

    const params: ShopHttpParams = {
      customerId: this._user$.value.customer.id
    };

    this.http.get<ApiResponse<Product[]>>(`${this._url}/api/Customers/order`, {
      params,
      headers: this._headers
    }).toPromise().then((response: ApiResponse<Product[]>) => {
      if (response.success === true) {
        this._products$.next(response.result);
      } else {
        this.dialogMessage.next({text: response.reason, successOfResponse: response.success});
      }
    });
  }

  /**
   * Получение информации о пользователе по логину
   * @returns {ApiResponse<UserToken>}
   * @param enterLogin
   */
  public GetUserInformation(enterLogin: string): void {
    this.http.get<ApiResponse<UserToken>>(`${this._url}/api/Customers/GetCustomer`, {
      params: {
        login: enterLogin
      }
    }).toPromise().then((response: ApiResponse<UserToken>) => {
      if (response.success === true) {
        this._user$.next(response.result);
        this._headers = new HttpHeaders({Authorization: 'Bearer ' + response.result.token});
        this.dialogMessage.next({text: 'Вход прошел успешно', successOfResponse: response.success});
      } else {
        this.dialogMessage.next({text: response.reason, successOfResponse: response.success});
      }
    });
  }

  /**
   * Добавление нового продукта
   * @returns {Observable<Product>}
   * @param product
   */
  public addProduct(product: Product): void {
    // tslint:disable-next-line:max-line-length
    this.http.post<ApiResponse<Product>>(`${this._url}/api/Products`, {
      name: product.name,
      count: product.count,
      price: product.price,
      customerId: this._user$.value.customer.id
    }, {headers: this._headers}).toPromise().then((response: ApiResponse<Product>) => {
      if (response.success === true) {
        this._products$.value.push(response.result);
        this.OrderPrice();
      } else {
        this.dialogMessage.next({text: response.reason, successOfResponse: response.success});
      }
    });
  }

  /**
   * Удаление продукта
   * @param product
   */
  public deleteProduct(productId: string): void {
    const params: ShopHttpParams = {
      id: productId
    };
    this.http.delete<ApiResponse<Product>>(`${this._url}/api/Products`, {
      params,
      headers: this._headers
    }).toPromise().then((response: ApiResponse<Product>) => {
      if (response.success === true) {
        const filterProduct = this._products$.value.filter((product: Product) => (product.id !== productId));
        this._products$.next(filterProduct);
        this.OrderPrice();
      } else {
        this.dialogMessage.next({text: response.reason, successOfResponse: response.success});
      }
    });
  }

  /**
   * Отчистка данных пользователя
   */
  public ClearUser(): void {
    this._user$.next({
      customer: null,
      token: null
    });
    this._products$.next([]);
  }

  /**
   * Подсчет общей стоимости
   */
  public OrderPrice(): void {
    let sum: number = 0;
    this._products$.value.map((product: Product) => {
      sum += (product.count * product.price);
    });
    this._user$.value.customer.orderPrice = sum;
  }

}
