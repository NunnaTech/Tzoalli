export const offlineMode = () => {
    navigator.serviceWorker.ready
        .then((swRegistration) => {
            swRegistration.sync.register("online")
            if (!navigator.onLine) {
                Notiflix.Notify.warning('MODO OFFLINE: Los cambios se reflejarán cuando se recupere la red');
            }
        })
        .catch((err) => {
            console.log(err)
        })
}