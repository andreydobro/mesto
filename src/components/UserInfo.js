export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            username: this._nameElement.textContent,
            userjob: this._jobElement.textContent,
        };
      }

      setUserInfo(form) {
        this._nameElement.textContent = form.username;
        this._jobElement.textContent = form.userjob;
      }
    }
    