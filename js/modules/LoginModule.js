import {LoginService} from "../services/LoginService.js";
// Login Button Actions
let btnLogin = document.getElementById("btnLogin")
// Login Service
const loginService = new LoginService()

btnLogin.addEventListener('click',()=>{
    let email = document.getElementById("emailInput").value
    let password = document.getElementById("passwordInput").value
    btnLogin.disabled = true;
    loginService.userLogin(email,password)
        .then((response) => response.json())
        .then((data)=>{
            if (data.status_code !== 500){
                localStorage.token = data.access_token;
                setTimeout(()=>{
                    btnLogin.disabled = false;
                    location.href = '../../dashboard.html';
                },5000)
            }else{
                Notiflix.Notify.warning('Error al iniciar sesion, revise sus datos');
            }
        })
        .catch((error)=>{
            Notiflix.Notify.failure('Ocurrio un error en el servidor');
        })
})
