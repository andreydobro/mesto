import { initialCards } from './initialCards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

//const popupEdit = document.querySelector('.popup-edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const popupFormEdit = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name_edit');
const aboutInput = document.querySelector('.popup__input_about_edit');
const buttonSaveEdit = document.querySelector('.popup__button-save');
const buttonSaveAdd = document.querySelector('.popup__button-save_add');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const buttonAdd = document.querySelector('.profile__add-button');
//const popupAdd = document.querySelector('.popup-add');
const elementText = document.querySelector('.element__title');
const template = document.querySelector('.template');
const elements = document.querySelector('.elements');
const cardName = document.querySelector('.popup__input_name_add');
const cardLink = document.querySelector('.popup__input_about_add');
const formAdd = document.querySelector('.popup__form-add');
const elementFoto = document.querySelector('.element__foto');
const popupImages = document.querySelector('.popup_image');
export const imageFoto = document.querySelector('.popup__image-foto');
export const popupImageName = document.querySelector('.popup__text');
const popups = document.querySelectorAll('.popup');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button-save',
    popupErrorSelector: '.popup__error',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// СОЗДАНИЕ КАРТОЧКИ
  function createCard(dataObj) {
    const card = new Card(dataObj, '.template', () => {popupWithImage.open(dataObj)});
    const newCard = card.createCard();
    console.log(dataObj)
    return newCard;
  }

  const section = new Section(
    {
      items: initialCards,
      renderer: (item) => section.addItem(createCard(item)),
    },
    '.elements'
  );
  // отрисовка карточек
  //section.renderItems();
  console.log(section.renderItems())
  
  ///POPUP карточки
  const popupWithImage = new PopupWithImage('.popup_image')
  popupWithImage.setEventListeners();
  
  ///Экземпляр формы добавления новой карточки
  const popupAdd = new PopupWithForm({
    popupSelector: '.popup-add',
    handleFormSubmit: (form)  => {
      section.addItem(createCard(form));
      console.log(section)
      },
  });
  popupAdd.setEventListeners();
  
  // Открытие попапа с формой добавления новой карточки
  buttonAdd.addEventListener('click', () => {
    popupAdd.open(); 
    const formAdd = popupAdd.getFormPopup();
    console.log(formAdd)
    formValidators[ formAdd.getAttribute('name') ]//.resetValidation()
  });
  
  ///Экземпляр профиля
  const userInfo = new UserInfo({
    nameSelector: '.profile__name',
    jobSelector: '.profile__about',
  });
  
  //Экземпляр формы редактирования профиля
  const popupEdit = new PopupWithForm({
    popupSelector: '.popup-edit',
    handleFormSubmit: (form)  => {
      userInfo.setUserInfo(form);
      },
  });
  popupEdit.setEventListeners();
  
  // Открытие попапа с формой редактирования профиля
  buttonEdit.addEventListener('click', () => {
    popupEdit.open();
    const formEdit = popupEdit.getFormPopup();
    const objectProfile = userInfo.getUserInfo();
    popupEdit.setInputValues(objectProfile);
    formValidators[ formEdit.getAttribute('name') ]//.resetValidation()
  });
  
  const formValidators = {}
  // Включение валидации
  const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector))
    formList.forEach((formElement) => {
      const validator = new FormValidator(config, formElement)
  // получаем данные из атрибута `name` у формы
      const formName = formElement.getAttribute('name')
  
     // вот тут в объект записываем под именем формы
      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };
  
  enableValidation(validationConfig);