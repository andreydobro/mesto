import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import { initialCards } from "../utils/constants";

import {
  validationConfig,
  buttonEdit,
  buttonAdd,
} from '../utils/constants.js';

import './index.css';

// СОЗДАНИЕ КАРТОЧКИ
  function createCard(dataObj) {
    const card = new Card(dataObj, '.template', () => {popupWithImage.open(dataObj)});
    const newCard = card.createCard();
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
  section.renderItems();
  
  //POPUP карточки
  const popupWithImage = new PopupWithImage('.popup_image')
  popupWithImage.setEventListeners();
  
  //добавление новой карточки
  const popupAdd = new PopupWithForm({
    popupSelector: '.popup-add',
    handleFormSubmit: (form)  => {
      section.addItem(createCard(form));
      },
  });
  popupAdd.setEventListeners();
  
  // Открытие попапа с формой добавления новой карточки
  buttonAdd.addEventListener('click', () => {
    popupAdd.open(); 
    const formAdd = popupAdd.getFormPopup();
    console.log(formAdd)
    formValidators[ formAdd.getAttribute('name') ].resetValidation()
  });
  
  //Экземпляр профиля
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
    formValidators[ formEdit.getAttribute('name') ].resetValidation()
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