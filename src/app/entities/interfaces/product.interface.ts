/**
 * Интерфейс продукта
 * @param id - id
 * @param name - название
 * @param price - цена
 * @param count - количество
 */
export interface Product {
  id?: string;
  name: string;
  price: number;
  count: number;
}
