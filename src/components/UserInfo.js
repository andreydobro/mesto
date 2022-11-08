export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent,
        };
      }

      setUserInfo(formData) {
        this._nameElement.textContent = formData.name;
        this._jobElement.textContent = formData.about;
        //this._avatarSelector.src = formData.avatar;
      }

      setUserId(formData) {
        return formData._id
      }

      userId() {
        return this._id;
      }

      setUserAvatar(avatarData) {
        this._avatarSelector.src = avatarData.avatar;
      }
    }

    