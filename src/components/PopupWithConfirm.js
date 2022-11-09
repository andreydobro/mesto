import Popup from '../components/Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._formPopup = this._popup.querySelector('.popup__form');
    this._buttonPopup = this._popup.querySelector('.popup__button-save');
    this._handleFormSubmit = handleFormSubmit;
    this._initialText = this._buttonPopup.textContent;
  }

  open(dataObj) {
    this._cardId = dataObj._id;
    super.open()
  }

  _getCardId() {
    return this._cardId
  }
  
   //метод добавляет обработчик клика иконке закрытия и добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();

    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonPopup.textContent = 'Сохранение...';
      this._handleFormSubmit(this._getCardId())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._buttonPopup.textContent = this._initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }

  close() {
    this._formPopup.reset();
    super.close()
  }
}