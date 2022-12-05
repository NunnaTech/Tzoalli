if (navigator.serviceWorker) {
    console.log("Support Service Worker")
    navigator.serviceWorker.register("/sw.js")
}
