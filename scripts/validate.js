const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  popupErrorSelector: '.popup__error',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Функция добавления класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__error_visible');
};

// Функция удаления класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__error_visible');
  formError.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, показывает ошибку
    showInputError(formInput, formInput.validationMessage);
  } else {
    // Если проходит, скрывает
    hideInputError(formInput);
  }
};
 
formElement.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener('input', isValid);