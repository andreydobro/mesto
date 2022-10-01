export default class FormValidator {
  #formSelector;
  #inputSelector;
  #submitButtonSelector;
  #popupErrorSelector;
  #inactiveButtonClass;
  #inputErrorClass;
  #errorClass;
  #formElement;
  #buttonElement;
  #inputList;
  #popupErrors
  #popupInputs;

  constructor(valid, formElement) {
    this.#formSelector = valid.formSelector;
    this.#inputSelector = valid.inputSelector;
    this.#submitButtonSelector = valid.submitButtonSelector;
    this.#popupErrorSelector = valid.popupErrorSelector;
    this.#inactiveButtonClass = valid.inactiveButtonClass;
    this.#inputErrorClass = valid.inputErrorClass;
    this.#errorClass = valid.errorClass;
    this.#formElement = formElement;
    this.#buttonElement = this.#formElement.querySelector(this.#submitButtonSelector);
    this.#inputList = Array.from(this.#formElement.querySelectorAll(this.#inputSelector));
    this.#popupErrors = Array.from(this.#formElement.querySelectorAll(this.#popupErrorSelector));
    this.#popupInputs = this.#formElement.querySelectorAll(this.#inputSelector);
  }

  #showInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.#inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this.#errorClass);
  };

  #hideInputError(inputElement) {
    const errorElement = this.#formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.#inputErrorClass);
    errorElement.classList.remove(this.#errorClass);
    errorElement.textContent = '';
  }

  #checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.#showInputError(inputElement);
    } else {
      this.#hideInputError(inputElement);
    }
  }

  #hasInvalidInput() {
    return this.#inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  #addDisabledButton() {
    this.#buttonElement.disabled = true;
    this.#buttonElement.classList.add(this.#inactiveButtonClass);
  }

  #removeDisabledButton() {
    this.#buttonElement.disabled = false;
    this.#buttonElement.classList.remove(this.#inactiveButtonClass);
  }

  #toggleButtonState() {
    if (this.#hasInvalidInput()) {
      this.#addDisabledButton()
    } else {
      this.#removeDisabledButton()
    }
  };

  resetErrorPopupInput() {
    this.#popupErrors.forEach((popupError) => {
      popupError.textContent = '';
    });

    this.#popupInputs.forEach((popupInput) => {
      popupInput.classList.remove(this.#inputErrorClass);
    });

    this.#toggleButtonState();
  };

  enableValidation() {
    this.#toggleButtonState();
  
    this.#inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.#checkInputValidity(inputElement);
        
        this.#toggleButtonState();
      });
    });
  }
}