export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameSelector = document.querySelector(nameSelector);
        this._jobSelector = document.querySelector(jobSelector);
    }

    getUserInfo() {
        return {
            username: this._nameSelector.textContent,
            userjob: this._jobSelector.textContent,
        };
      }

      setUserInfo(form) {
        this._nameSelector.textContent = form.username;
        this._jobSelector.textContent = form.userjob;
      }

    /*getUserInfo() {
        this._profileObject = { };
        this._profileObject.username = this._nameSelector.textContent;
        this._profileObject.userjob = this._jobSelector.textContent;
        return this._profileObject;
      }
    
      setUserInfo(form) {
        this._nameSelector.textContent = form.username;
        this._jobSelector.textContent = form.userjob;
      }*/
    }
    