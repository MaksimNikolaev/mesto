import { profileTitle, profileSubtitle } from '../pages/index.js'
export default class UserInfo {
  constructor(name, info) {
    this._name = document.querySelector(name);
    this._info = document.querySelector(info);
  }

  getUserInfo() {
    this._name.value = profileTitle.textContent;
    this._info.value = profileSubtitle.textContent;
  }

  setUserInfo() {
    profileTitle.textContent = this._name.value;
    profileSubtitle.textContent = this._info.value;
  }
}
