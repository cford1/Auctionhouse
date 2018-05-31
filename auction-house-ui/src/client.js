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

function parseJSON(response) {
    return response.json();
}

const Client = { create };
export default Client;