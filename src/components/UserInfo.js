export default class UserInfo {
  constructor({nameSelector, jobSelector}) {
    //this._name = document.querySelector(name);
    //this._info = document.querySelector(info);
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    }
    //this._name.value = this._profileTitle.textContent;
    //this._info.value = this._profileSubtitle.textContent;
  }

  setUserInfo(name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }
}
