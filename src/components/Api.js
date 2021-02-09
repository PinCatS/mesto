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

  // другие методы работы с API
}
