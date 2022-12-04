if (navigator.serviceWorker) {
    console.log("Support Service Worker")
    navigator.serviceWorker.register("/sw.js")

    navigator.serviceWorker.ready
        .then((swRegistration) => {
            swRegistration.sync.register("online")
        })
        .catch((err) => {
            console.log(err)
        })

}