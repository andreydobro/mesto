const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  popupErrorSelector: '.popup__error',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, config, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorElement)
  inputElement.classList.remove(config.inputErrorClass); 
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

//функция проверки поля на валидность
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
  
    showInputError(formElement, inputElement, config, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция проверяет наличие невалидного поля
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
  });
};

const addDisabledButton = (buttonElement) => {
  console.log(buttonElement)
  buttonElement.setAttribute('disabled', 'disabled');
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const removeDisabledButton = (buttonElement) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement) => {
  console.log(inputList);
  if (hasInvalidInput(inputList)) {
  
  addDisabledButton(buttonElement);
} else {
  
  removeDisabledButton(buttonElement);
}
}

// Функция для очистки текста ошибок после открытия формы
const resetErrorPopupInput = (formElement) => {
  const popupErrors = Array.from(formElement.querySelectorAll(validationConfig.popupErrorSelector));
  popupErrors.forEach((popupError) => {
    popupError.textContent = '';
    });
  const popupInputs = formElement.querySelectorAll(validationConfig.inputSelector);
  popupInputs.forEach((popupInput) => {
    popupInput.classList.remove(validationConfig.inputErrorClass);
    });
};

// добавляем обработчик формы ко всем полям input
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector)); // '.popup__form'
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
  });
    setEventListeners(formElement, config);

});
}

enableValidation(validationConfig);