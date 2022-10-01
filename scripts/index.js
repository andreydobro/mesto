import { initialCards } from "./initialCards.js";
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEdit = document.querySelector('.popup-edit');
const buttonOpenEdit = document.querySelector('.profile__edit-button_opened');
const popupFormEdit = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name_edit');
const aboutInput = document.querySelector('.popup__input_about_edit');
const buttonSaveEdit = document.querySelector('.popup__button-save');
const buttonSaveAdd = document.querySelector('.popup__button-save_add');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const buttonOpenAdd = document.querySelector('.profile__add-button_opened');
const popupAdd = document.querySelector('.popup-add');
const elementText = document.querySelector('.element__title');
const template = document.querySelector('.template');
const elements = document.querySelector('.elements');
const cardName = document.querySelector('.popup__input_name_add');
const cardLink = document.querySelector('.popup__input_about_add');
const formAdd = document.querySelector('.popup__form-add');
const elementFoto = document.querySelector('.element__foto');
const popupImage = document.querySelector('.popup_image');
const imageFoto = document.querySelector('.popup__image-foto');
const popupImageName = document.querySelector('.popup__text');
const popup = document.querySelectorAll('.popup');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    popupErrorSelector: '.popup__error',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const formValidator = {}
const onValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')

    formValidator[formName] = validator;
    validator.enableValidation();
  });
};

onValidation(validationConfig);

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEsc);
    popup.addEventListener('click', handleClickOverlayPopup);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEsc);
    popup.removeEventListener('click', handleClickOverlayPopup);
}

//закрытие по Esc
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//Закрытие по клику на оверлей
function handleClickOverlayPopup(evt) {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__icon-close')) {
        closePopup(evt.currentTarget);
    }
}

function openImagePopup(name, link) {
    imageFoto.src = link;
    imageFoto.alt = name;
    popupImageName.textContent = name;
    openPopup(popupImage);
  }

buttonOpenEdit.addEventListener('click', function () {
    openPopup(popupEdit);
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
});

buttonOpenAdd.addEventListener('click', function () {
    openPopup(popupAdd);
    cardName.value = '';
    cardLink.value = '';
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
}

// создание карточки
function createCard(obj) {
    const newCardElement = new Card(obj,  '.template', openImagePopup).createCard();
    return newCardElement;
  }
  
  // добавлениее карточки на страницу
  function renderCard(obj) {
    const createdCard = createCard(obj);
    elements.prepend(createdCard);
  }

  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const namePlace = cardName.value;
    const linkPlace = cardLink.value;
    const newCard = new Object();
    newCard.name = namePlace;
    newCard.link = linkPlace;
  
    formAdd.reset();
  
    renderCard(newCard);
    closePopup(popupAdd);
  }
  
initialCards.forEach((obj) => renderCard(obj));

formAdd.addEventListener('submit', handleCardFormSubmit);
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);