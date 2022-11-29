import { getApiUrl } from "../utils/api.js";

export class VisitService {

    GetAllCompletedVisits(token) {
        return fetch(getApiUrl("visit/getMyVisits/Realizado"),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    GetAllPendingVisits(token) {
        return fetch(getApiUrl("visit/getMyVisits/En camino"),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    GetAllNextVisits(token) {
        return fetch(getApiUrl("visit/getMyVisits/Pendiente"),
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
    }

    Complete(id, token) {
        return fetch(getApiUrl(`visit/updateStatus/${id}`),
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: "Realizado" })
            })
    }

}