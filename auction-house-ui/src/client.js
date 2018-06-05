function create(type, data) {
    return new Promise((resolve, reject) => {
        return fetch(`api/${type}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            },
            method: 'post',
            body: JSON.stringify(data)
        })
        .then(parseJSON)
        .then(() => resolve())
    })
}

function search(query, cb) {
    return new Promise( (resolve,reject) => {
        return fetch(`api/${query}`, {
            accept: "application/json"
        })
            .then(parseJSON)
            .then(data => resolve(data));
    })

}

function parseJSON(response) {
    return response.json();
}

const Client = { create, search };
export default Client;