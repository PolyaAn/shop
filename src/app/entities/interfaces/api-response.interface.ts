/**
 * Интерфейс продукта
 * @param id - id
 * @param login - логин пользователя
 * @param orderPrice - общая стоимость
 */
import {Product} from './product.interface';

export interface ApiResponse<T> {
  success: boolean;
  result?: T;
  reason?: string;
}
