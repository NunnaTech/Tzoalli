import { getApiUrl } from "../utils/api.js";

export class ObservationService{
    getAllObservations(token,id){
        return fetch(getApiUrl(`observation/getAllByVisit/${id}`),{
            method:'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
    }
}