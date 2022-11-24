import {Camera} from "../utils/Camera.js";

const video = document.getElementById("video");
const photo = document.getElementById("photo");

const btnCamera = document.getElementById("open");
const btnTake = document.getElementById("take");

const camera = new Camera(video);

btnCamera.addEventListener('click',()=>{
    camera.power()
})