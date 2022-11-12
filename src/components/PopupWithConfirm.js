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

  open(data) {
    this._data = data;
    super.open()
  }
  
   //метод добавляет обработчик клика иконке закрытия и добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();

    this._formPopup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._data)
    });
  }

  // Изменяем состояние кнопки во время загрузки
  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonPopup.textContent = "Сохранение...";
    } else {
      this._buttonPopup.textContent = this._initialText;
    }
  }

  close() {
    this._formPopup.reset();
    super.close()
  }
}

/*export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, { handleDeleteButoonClick }) {
    super(popupSelector);
    this._buttonPopup = this._popup.querySelector('.popup__button-save');
    this._handleFormSubmit = handleFormSubmit;
    this._handleDeleteButoonClick =  handleDeleteButoonClick;
  }
    open() {
      super.open();
    }
  
    close() {
      super.close();
    }
  
    _handlerCallBack() {
      this._handleDeleteButoonClick(this._data);
    }
  
    setEventListeners() {
      super.setEventListeners();
      this._buttonPopup.addEventListener('click', this._handlerCallBack);
    }
  }*/