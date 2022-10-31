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

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._header
        })
        .then(this._checkResponse)
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._header
        })
        .then(this._checkResponse)
    }

    //editUserInfo(name, about)
}