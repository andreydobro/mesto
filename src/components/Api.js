export default class Api {
    constructor(config) {
        this._url = config.url;
        this._header = config.headers;
    }

    _requestResult(response) {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(
            `Ошибка ${response.status} - ${response.statusText}`
          );
        }
      }

      /*getInitialCards() {
        return fetch(`${this._url}/cards`, {
          headers: this._header})
          .then(this._requestResult)
      }*/

      //Запрос карточек с сеервера
     getInitialCards() {
        return fetch(`${this._url}/cards`, {
          headers: {
            authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58',
          },
        })
        .then(this._requestResult)
      }

      //Запрос данных профиля с сеервера
    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
          headers: {
            authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58',
          },
        })
        .then(this._requestResult)
    }

    editUserInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, about })
        })
        .then(this._requestResult)
    }

    editUserAvatar(avatar) {
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ avatar })
        })
        .then(this._requestResult)
    }

    createCard(name, link) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: {
                authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58'
            },
            body: JSON.stringify({ name, link })
        })
        .then(this._requestResult)
    }

    addLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: {
                authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58'
            },
        })
        .then(this._requestResult)
      }
    
      removeLikeCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58'
        },
        })
        .then(this._requestResult)
      }
    
    
      deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
          method: 'DELETE',
          headers: {
            authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58'
        },
        })
        .then(this._requestResult)
      }
}