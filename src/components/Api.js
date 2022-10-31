export default class Api {
    constructor(config) {
        this._url = config.url;
        this._header = config.headers;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json()
        }
        return Promise.reject(new Error(response.status))
    }
}