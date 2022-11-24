import {Camera} from "../utils/Camera.js";
import {ObservationService} from "../services/ObservationService.js";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

const observationService = new ObservationService()

const video = document.getElementById("video");
const photo = document.getElementById("photo");

const btnCamera = document.getElementById("open");
const btnTake = document.getElementById("take");
const btnSave = document.getElementById("saveObservation");

const camera = new Camera(video);
let pictures = []

let params = window.location;

btnCamera.addEventListener('click',()=>{
    camera.power()
})

btnTake.addEventListener('click',()=>{
    let picture = camera.takePhoto()
    pictures.push(picture)
    camera.off()

    while (photo.firstChild) {
        photo.firstChild.remove()
    }

    pictures.map((p,i)=>{
        photo.insertAdjacentHTML('beforeend',
            `
            <div class="carousel-item">
                 <img class="rounded-box" src=${p} />
             </div>
            `)
    })
})

const random = () => {
    return ([1e9] + -43 + -8e3 + -11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

btnSave.addEventListener('click',()=>{
    let links = []
    if (pictures.length>0){
        pictures.map(async (p, i) => {
            const {data, error} = await _supabase.storage
                .from('evidencias')
                .upload(`public/${random()}`, pictures[i])
            if (data != null) {
                links.push(`https://szdguzpruwwvtoimdfyk.supabase.co/storage/v1/object/public/evidencias/${data.path}`)
            }
            if (error != null) {
                Notiflix.Notify.failure("Ocurrio un error al subir la imagen")
            }
        })
        let title = document.getElementById("title").value
        let comment = document.getElementById("comment").value
        let id = params.href.split("?")[1]
        let obj = {title:title,comment:comment,id:id}
        observationService.saveObservations(localStorage.token,obj,links)
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
            })
            .catch((error)=>{
                Notiflix.Notify.failure("Ocurrio un error al subir la información")
            })
    }
})