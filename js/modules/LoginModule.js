import { LoginService } from "../services/LoginService.js";
// Login Button Actions
let btnLogin = document.getElementById("btnLogin")
// Login Service
const loginService = new LoginService()

Notiflix.Notify.init({ position: 'center-top', })

btnLogin.addEventListener('click', () => {
    let email = document.getElementById("emailInput").value
    let password = document.getElementById("passwordInput").value
    if (email === "" || password === "") {
        Notiflix.Notify.warning('Ingresa usuario y contraseña');
    } else {
        btnLogin.disabled = true;
        login(email, password)
    }
})

const login = (email, password) => {
    loginService.userLogin(email, password)
        .then((response) => response.json())
        .then((data) => {
            if (data.status_code !== 500) {
                setTimeout(() => {
                    localStorage.token = data.access_token;
                    location.href = '../../completed-visits.html';
                    btnLogin.disabled = false;
                }, 2000)
            } else {
                Notiflix.Notify.warning('Credenciales Incorrectas');
                btnLogin.disabled = false;
            }
        })
        .catch((error) => {
            btnLogin.disabled = false;
            Notiflix.Notify.failure('Ocurrio un Error');
        })
}

