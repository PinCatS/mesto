export default class UserInfo {
  constructor(profileNameSelector, profileInfoSelector) {
    this._userNameElement = document.querySelector(profileNameSelector);
    this._userInfoElement = document.querySelector(profileInfoSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameElement.textContent,
      about: this._userInfoElement.textContent
    }
  }

  setUserInfo(name, about) {
    this._userNameElement.textContent = name;
    this._userInfoElement.textContent = about;
  }
}
