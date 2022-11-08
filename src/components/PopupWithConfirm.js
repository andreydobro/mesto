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

  openPopup(objectCard) {
    this._cardId = objectCard._id;
    super.open()
  }

  getIdCard() {
    return this._cardId
  }

  /**
   * публичный метод добавляет обработчик клика иконке закрытия и добавлять обработчик сабмита формы.
   */
  setEventListeners() {
    super.setEventListeners();

    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._buttonPopup.textContent = 'Сохранение...';// меняем его, чтобы показать пользователю ожидание
      this._handleFormSubmit(this._getIdCard())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._buttonPopup.textContent = this._initialText;
        }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
    });
  }

  /**
   * метод для закрытия попапа и сброса форма.
   */
  close() {
    this._formPopup.reset();
    super.close()
  }
}