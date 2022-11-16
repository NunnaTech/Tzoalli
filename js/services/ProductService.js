import { getApiUrl } from "../utils/api.js";

export class ProductService {

    GetAllProductsByCoincidence(token, coincidence) {
        return fetch(getApiUrl(`product/findByName/${coincidence}`), {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })

    }
    GetAllProducts(token) {
        return fetch(getApiUrl("product"), {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            },
        })
    }
}
