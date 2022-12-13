import { getApiUrl } from "../utils/api.js";

export class OrderService {

    StoreOrder(token, order) {
        return fetch(getApiUrl(`order`), {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                received_by: order.received_by,
                total_order_amount: order.total_order_amount,
                visit_id: order.visit_id,
                products: order.products
            })
        })
    }


}

