export default class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _errorHandler(res) {
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getInitialCards() {
    return fetch(`https://mesto.${this._url}cards`, {headers: this._headers})
    .then(this._errorHandler)
  }

  getInitialUser() {
    return fetch(`https://${this._url}users/me`, {headers: this._headers})
    .then(this._errorHandler)
  }

  setUserInfo(data) {
    return fetch(`https://mesto.${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })})
    .then(this._errorHandler)
  }

  addCard (name, link) {
        return fetch(`https://mesto.${this._url}cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link,
            }),
        })
            .then(this._errorHandler)
    }

  removeCard(id) {
    return fetch(`https://mesto.${this._url}cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
            })
            .then(this._errorHandler)
  }

  addLike(id) {
    return fetch(`https://mesto.${this._url}cards/${id}/likes`, {
            method: "PUT",
            headers: this._headers,
            })
            .then(this._errorHandler)
  }

  removeLike(id) {
    return fetch(`https://mesto.${this._url}cards/${id}/likes`, {
            method: "DELETE",
            headers: this._headers,
            })
            .then(this._errorHandler)
  }
}
