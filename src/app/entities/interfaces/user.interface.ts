/**
 * Интерфейс продукта
 * @param id - id
 * @param login - логин пользователя
 * @param orderPrice - общая стоимость
 */
import {Product} from './product.interface';

export interface User {
  id: string;
  login: string;
  orderPrice?: number;
  products?: Product[];
}
