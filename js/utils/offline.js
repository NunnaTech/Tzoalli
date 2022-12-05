export const offlineMode = () => {
    navigator.serviceWorker.ready
        .then((swRegistration) => {
            swRegistration.sync.register("online")
        })
        .catch((err) => {
            console.log(err)
        })

}