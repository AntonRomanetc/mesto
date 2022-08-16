export default class UserInfo {
  constructor(userInfoInputsSelector) {
    this._userName = document.querySelector(userInfoInputsSelector.nameSelector);
    this._userJob = document.querySelector(userInfoInputsSelector.jobSelector);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.textContent
    };
  }

  setUserInfo(user) {
    this._userName.textContent = user.name;
    this._userJob.textContent = user.job;
  }
}