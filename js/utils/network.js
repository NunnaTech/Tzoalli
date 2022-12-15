Notiflix.Notify.init({ position: 'center-top' })

window.addEventListener('online', () => {
    Notiflix.Notify.success('Se ha detectado una red!');
})

window.addEventListener('offline', () => {
    Notiflix.Notify.warning('Modo Offline: Los cambios se reflejarán cuando se detecte una red');
})