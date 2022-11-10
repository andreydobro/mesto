import Popup from "../components/Popup.js";

export default class PopupWithForm extends Popup {
  
    constructor({ popupSelector, handleFormSubmit }) {
      super(popupSelector);
      this._popup = document.querySelector(popupSelector);
      this._formPopup = this._popup.querySelector('.popup__form');
      this._inputList = this._popup.querySelectorAll('.popup__input');
      this._handleFormSubmit = handleFormSubmit;
      this._buttonPopup = this._popup.querySelector('.popup__button-save');
      this._initialText = this._buttonPopup.textContent;
    }
  
    getFormPopup() {
        return this._formPopup;
      }
    
      _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        console.log(this._formValues)
        return this._formValues;
      }
    
      setInputValues(inputObject) {
        this._inputList.forEach(input => input.value = inputObject[input.name]);
      }
    
      setEventListeners() {
        super.setEventListeners();
    
        this._formPopup.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
          this.close();
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