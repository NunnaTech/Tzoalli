import {getApiUrl} from "../utils/api.js";

export class LoginService {

    userLogin(email,password){
        return fetch(getApiUrl('login'),{
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
    }

}