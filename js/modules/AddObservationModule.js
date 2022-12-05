import { Camera } from "../utils/Camera.js";
import { ObservationService } from "../services/ObservationService.js";
import { offlineMode } from "../utils/offline.js"

offlineMode()
const SUPABASE_URL = 'https://szdguzpruwwvtoimdfyk.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6ZGd1enBydXd3dnRvaW1kZnlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NTY3OTAyMSwiZXhwIjoxOTgxMjU1MDIxfQ.37PcyokA2Ye31xLUgIQEHXOCECzBG7JSSRgFtAQZkeQ'
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

btnCamera.addEventListener('click', () => {
    camera.power()
})

btnTake.addEventListener('click', () => {
    let picture = camera.takePhoto()
    pictures.push(picture)
    camera.off()

    while (photo.firstChild) {
        photo.firstChild.remove()
    }

    pictures.map((p, i) => {
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

/*
const upload = async (i) => {
    const { data, error } = await _supabase.storage
        .from('evidencias')
        .upload(`public/${random()}`, pictures[i])
    if (data != null) {
        return data.path
    }
    if (error != null) {
        return null
    }
}*/

btnSave.addEventListener('click', async () => {
    let imgs = []


    if (pictures.length > 0) {
        // pictures.map(async (p, i) => {
        //     if (upload(i) != null) {
        //         imgs.push(await upload(i))
        //     }
        // })
        let blobimg = base64ImageToBlob(pictures[0])
        const { data, error } = await _supabase.storage
            .from('evidencias')
            .upload(`public/${random()}.png`, blobimg)
        if (data != null) {
            imgs.push(`https://szdguzpruwwvtoimdfyk.supabase.co/storage/v1/object/public/evidencias/${data.path}`)
        }
        if (error != null) {
            return null
        }

        let title = document.getElementById("title").value
        let comment = document.getElementById("comment").value
        let id = params.href.split("?")[1]
        let obj = { title: title, comment: comment, id: id }


        observationService.saveObservations(localStorage.token, obj, imgs)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                location.href = '../.././observations.html?' + id;
            })
            .catch((error) => {
                Notiflix.Notify.failure("Ocurrio un error al subir la información")
            })
    }
})



function base64ImageToBlob(str) {
    // extract content type and base64 payload from original string
    var pos = str.indexOf(';base64,');
    var type = str.substring(5, pos);
    var b64 = str.substr(pos + 8);

    // decode base64
    var imageContent = atob(b64);

    // create an ArrayBuffer and a view (as unsigned 8-bit)
    var buffer = new ArrayBuffer(imageContent.length);
    var view = new Uint8Array(buffer);

    // fill the view, using the decoded base64
    for (var n = 0; n < imageContent.length; n++) {
        view[n] = imageContent.charCodeAt(n);
    }

    // convert ArrayBuffer to Blob
    var blob = new Blob([buffer], { type: type });

    return blob;
}