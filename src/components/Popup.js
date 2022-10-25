export default class Popup {
  
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
    }

    open() {
      this._popup.classList.add('popup_opened');
      document.addEventListener('keydown', this._handleEscClose);
    }
  
    close() {
      this._popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', this._handleEscClose);
    }
  
    _handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    }
  
    _handleClickOverlayPopup = (evt) => {
      if (evt.target === this._popup) {
        this.close();
    }

    }

    setEventListeners() {
      const popupCloseButton = this._popup.querySelector('.popup__icon-close');
      popupCloseButton.addEventListener('click', () => {
        this.close();
      });
  
      this._popup.addEventListener('mousedown', this._handleClickOverlayPopup);
    }
  }