import { getApiUrl } from "../utils/api.js";

export class ObservationService {
    getAllObservations(token, id) {
        return fetch(getApiUrl(`observation/getAllByVisit/${id}`), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
    }

    saveObservations(token, obj, urls) {

        return fetch(getApiUrl(`observation`), {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: obj.title,
                comment: obj.comment,
                visit: { id: obj.id },
                urls: urls,
            }),
        })
    }
}