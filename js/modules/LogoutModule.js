import {LoginService} from "../services/LoginService.js";

// Logout Button Actions
let btnLogout = document.getElementById("btnLogout")
// Login Service
const loginService = new LoginService()

btnLogout.addEventListener('click',()=>{
    let token = localStorage.token
    loginService.userLogout(token)
        .then(()=>{
            localStorage.clear()
            location.href = '../../index.html'
        })
})
