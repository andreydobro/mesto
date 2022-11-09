import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  validationConfig,
  buttonEdit,
  buttonAdd,
  avatarEdit,
} from '../utils/constants.js';

import './index.css';

let userId;
let cardDelete;


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
    headers: {
      authorization: 'df12ed01-f693-4b5e-b6fe-aa462d0d5b58',
      'Content-Type': 'application/json'
    },
})

//api.deleteCard()
api.addLikeCard()
api.removeLikeCard()
//Экземпляр класса Section
const section = new Section({
  renderer: (dataObj) => {
    section.addItem(createCard(dataObj));
  }},
  '.elements'
)

//Создаём массив с промисами
const arrayPromises = [api.getUserInfo(), api.getInitialCards()];
Promise.all(arrayPromises)
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserId(userData);
    userId = userData._id
    section.renderItems(cards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`)
  });

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

    handleDeleteButoonClick: () => {
      popupConfirmForm.open(dataObj);
      cardDelete = card
    }
  },
  userId
  );
  const newCard = card.createCard();
  return newCard;
}

const popupWithImage = new PopupWithImage('.popup_image')
popupWithImage.setEventListeners();

buttonAdd.addEventListener('click', () => {
  popupAddForm.open();
  const formAdd = popupAddForm.getFormPopup();
  formValidators[ formAdd.getAttribute('name') ].resetValidation()
});

const popupAddForm = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (cardData)  => {
    return api.createCard(cardData.name, cardData.link)
    .then(formData => {
      section.addItemNew(createCard(formData));
    })
    .catch((err) => {
      console.log('Ошибка при добавлении новой карточки', err);
    })
  }
});
popupAddForm.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__about',
  avatarSelector: '.profile__avatar',
});

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

buttonEdit.addEventListener('click', () => {
  popupEditForm.open();
  const formEdit = popupEditForm.getFormPopup();
  const objectProfile = userInfo.getUserInfo();
  popupEditForm.setInputValues(objectProfile);
  formValidators[ formEdit.getAttribute('name') ].resetValidation()
});


//Открытие попапа с формой редактирования аватара
avatarEdit.addEventListener('click', () => {
  popupAvatarForm.open();
  const formAvatar = popupAvatarForm.getFormPopup();
  formValidators[ formAvatar.getAttribute('name') ].resetValidation()
});

//экземпляр формы редактирования аватара
const popupAvatarForm = new PopupWithForm({
  popupSelector: '.popup-avatar',
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
popupAvatarForm.setEventListeners();

//экземпляр формы подтверждения удаления карточки
const popupConfirmForm = new PopupWithConfirm({
  popupSelector: '.popup-confirm',
  handleFormSubmit: (cardId)  => {
    return api.deleteCard(cardId)
    .then(() => {
      cardDelete.handleDeleteCard();
    })
    .catch((err) => {
      console.log('Ошибка при подтверждении удаления карточки', err);
    })
  },
});
popupConfirmForm.setEventListeners();

const formValidators = {}
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);