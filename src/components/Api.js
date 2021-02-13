export default class Api {
  constructor({ baseUrl, token }) {
    this.baseUrl = baseUrl;
    this.token = token;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) return res.json();

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    })
  }

  updateAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({avatar: link})
    })
    .then(res => {
      if (res.ok) return Promise.resolve();

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }

  setProfile(name, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({name, about})
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      };

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }

  addCard(name, link) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({name, link})
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      };

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }

  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) return Promise.resolve();

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }

  setLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      };

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }

  removeLike(cardId) {
    return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this.token,
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      };

      return Promise.reject({
        status: res.status,
        statusText: res.statusText
      });
    });
  }
}
