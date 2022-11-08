import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
//import { initialCards } from "../utils/constants";

import {
  validationConfig,
  buttonEdit,
  buttonAdd,
} from '../utils/constants.js';

import './index.css';

let userId;

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
      authorization: 'df12ed01-f693-4d5e-b6fe-aa462dOd5d58',
      'Content-Type': 'application/json'
    },
})

//Экземпляр класса Section
const cardsList = new Section({
  renderer: (dataObj) => {
    cardsList.addItem(createCard(dataObj));
  }},
  '.elements'
);

api.getInitialCards().then( data => {
  cardsList.renderItems(data)
})

api.getUserInfo().then( data => {
  userInfo.setUserInfo(data);
    userInfo.setUserId(data);
    userId = data._id
})


 //функция создания карточки
function createCard(dataObj) {
  const card = new Card(dataObj, '.template', {
    handleCardClick: () => {
      popupWithImage.open(dataObj)
    },

    handleAddLike: () => {
      api.addLikeCard(dataObj._id)
      .then(dataObj => {
        card.setLikeInfo(dataObj.likes);
      })
      .catch((err) => {
        console.log('Ошибка при добавлении Like карточки', err);
    });},

    handleRemoveLike: () => {
      api.removeLikeCard(dataObj._id)
      .then(dataObj => {
        card.setLikeInfo(dataObj.likes);
      })
      .catch((err) => {
        console.log('Ошибка при удалении Like карточки', err);
    });},

    handleTrashClick: () => {
      popupConfirmForm.openPopup(dataObj);
      cardForDelete = card
    }
  },
  userId
  );
  const newCard = card.createCard();
  return newCard;
}

/**
 * экземпляр попапа с картинкой
 */
const popupWithImage = new PopupWithImage('.popup_image')
popupWithImage.setEventListeners();

/**
 * Открытие попапа с формой добавления новой карточки
 */
buttonAdd.addEventListener('click', () => {
  popupAddForm.open();
  const formAdd = popupAddForm.getFormPopup();
  formValidators[ formAdd.getAttribute('name') ].resetValidation()
});

/**
 * экземпляр формы добавления новой карточки
 */
const popupAddForm = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (cardData)  => {
    return api.createCard(cardData.name, cardData.link)
    .then(formData => {
      cardsList.addItem(createNewCard(formData));
    })
    .catch((err) => {
      console.log('Ошибка при добавлении новой карточки', err);
    })
  }
});
popupAddForm.setEventListeners();

/**
 * экземпляр UserInfo отвечает за управление отображением информации о пользователе на странице
 */
const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
});

/**
 * Экземпляр формы редактирования профиля
 */
const popupEditForm = new PopupWithForm({
  popupSelector: '.popup-edit',
  handleFormSubmit: (user)  => {
    return api.editUserInfo(user.name, user.about)
    .then((formData) => {
      userInfo.setUserInfo(formData);
    }).catch((err) => {
      console.log('Ошибка при редактировании профиля', err);
    })
    },
  });
popupEditForm.setEventListeners();

/**
 * Открытие попапа с формой редактирования профиля
 */
buttonEdit.addEventListener('click', () => {
  popupEditForm.open();
  const formEdit = popupEditForm.getFormPopup();
  const objectProfile = userInfo.getUserInfo();
  popupEditForm.setInputValues(objectProfile);
  formValidators[ formEdit.getAttribute('name') ].resetValidation()
});

/**
 * Открытие попапа с формой редактирования аватара
 */
/*avatarEdit.addEventListener('click', () => {
  popupAvatarForm.openPopup();
  const formAvatar = popupAvatarForm.getFormPopup();
  formValidators[ formAvatar.getAttribute('name') ].resetValidation()
});*/

/**
 * экземпляр формы редактирования аватара
 */
/*const popupAvatarForm = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (userData)  => {
    return api.editUserAvatar(userData.avatar)
    .then(formData => {
      userInfo.setUserAvatar(formData);
    })
    .catch((err) => {
      console.log('Ошибка при редактировании аватара', err);
    })
  },
});
popupAvatarForm.setEventListeners();*/

/**
 * экземпляр формы подтверждения удаления карточки
 */
/*const popupConfirmForm = new PopupWithConfirm({
  popupSelector: '.popup_type_confirmation',
  handleFormSubmit: (cardId)  => {
    console.log(cardId);
    return api.deleteCard(cardId) // cardId определяем в экземпляре Card
    .then(() => {
      cardForDelete.handleDeleteCard();// cardForDelete определяем в экземпляре Card
    })
    .catch((err) => {
      console.log('Ошибка при подтверждении удаления карточки', err);
    })
  },
});
popupConfirmForm.setEventListeners();*/

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