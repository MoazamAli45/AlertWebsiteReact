import { Order } from '@/features/option-flow/types';

export function cleanOrders(orders: Order[]): Order[] {
  if (orders) {
    return orders?.map((order) => {
      const cleanedOrder: Order = {} as Order;
      for (const key in order) {
        if (Object.prototype.hasOwnProperty.call(order, key)) {
          const cleanedKey = key.split(': ')[1];
          cleanedOrder[cleanedKey] = order[key];
        }
      }
      return cleanedOrder;
    });
  }

  return [];
}
