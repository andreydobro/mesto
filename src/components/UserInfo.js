export default class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    }

    /*getUserInfo() {
        return {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent,
        };
      }*/

      getUserInfo() {
        this._profileObject = { };
        this._profileObject.name = this._nameElement.textContent;
        this._profileObject.about = this._aboutElement.textContent;
        return this._profileObject;
      }

      setUserInfo(formData) {
        this._nameElement.textContent = formData.name;
        this._aboutElement.textContent = formData.about;
        this._avatarElement.src = formData.avatar;
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

    