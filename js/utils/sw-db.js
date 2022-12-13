const db = new PouchDB("offlinePost");

function savePostOffline(body, url, method, session) {
    return db.post({ body: body, url: url, method: method, token: session }).then((pouchResponse) => {
        return new Response(JSON.stringify(pouchResponse));
    })
}

function getAllPostOffline() {
    return db.allDocs({
        include_docs: true,
        attachments: true
    }).then((result) => {
        return result
    }).catch((err) => {
        return err
    });
}