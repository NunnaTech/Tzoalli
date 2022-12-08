if (navigator.serviceWorker) {
    console.log("Support Service Worker")
    navigator.serviceWorker.register("/sw.js")
    if (!navigator.onLine) {
        Notiflix.Notify.warning('Sin conexión: No puedes acceder sin internet');
    }
}