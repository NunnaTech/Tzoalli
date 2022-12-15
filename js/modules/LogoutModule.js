import { LoginService } from "../services/LoginService.js";

// Logout Button Actions
let btnLogout = document.getElementById("btnLogout")
// Login Service
const loginService = new LoginService()
const DYNAMYC_CACHE = 'dynamic-v1.0'

btnLogout.addEventListener('click', () => {
    let token = localStorage.token
    loginService.userLogout(token)
        .then(() => {
            localStorage.clear()
            caches.delete(DYNAMYC_CACHE)
            location.href = '../../index.html'
        })
})
