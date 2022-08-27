let popup = document.querySelector('.popup');
let editOpenButton = document.querySelector('.profile__edit-button_opened');
let closeButtton = popup.querySelector('.popup__icon-close');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name_edit');
let aboutInput = document.querySelector('.popup__input_about_edit');
let saveButton = document.querySelector('.popup__bottom-save');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let addOpenButton = document.querySelector('.profile__add-button_opened');
let popupAdd = document.querySelector('.popup-add_opened');

function openPopup(popup) {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    popupAdd.classList.add('popup-add_opened');
}

editOpenButton.addEventListener('click', function() {
    openPopup(popup);
});

addOpenButton.addEventListener('click', function() {
    openPopup(popupAdd);
});

let closePopup = function () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup();
}

let inputTitle = document.querySelector('.popup__input_name_add');
let inputLink = document.querySelector('.popup__input_about_add');
let formAdd = document.querySelector('.popup__form-add');

function formSubmitHandlerAdd(evt) {
    evt.preventDefault();
    const text = inputTitle.value;
    const link = inputLink.value;

    newCartElement(evt);
    closePopup();
}

formAdd.addEventListener('submit', formSubmitHandlerAdd);

popupForm.addEventListener('submit', formSubmitHandler);
closeButtton.addEventListener('click', closePopup);

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

let cartTemplate = document.querySelector('.cart__template').content;
let elementList = document.querySelector('.elements');
let imageOpenPopup = document.querySelector('.popup-image_opened');
/*Копия элемента*/
initialCards.forEach(function(element) {
    const newCartElement = cartTemplate.cloneNode(true);

    newCartElement.querySelector('.element__title').textContent = element.name;
    newCartElement.querySelector('.element__foto').textContent = element.link;
    newCartElement.querySelector('.element__foto').src = element.link;
    newCartElement.querySelector('.element__foto').alt = element.name;
/*Удаление элементов*/
    newCartElement.querySelector('.element__back')
    .addEventListener('click', (evt) => {
        const cardElement = evt.target.closest('.element');
        cardElement.remove();
    });
/*Постановка лайка*/
    newCartElement.querySelector('.element__heart')
    .addEventListener('click', (evt) => {
        const likeElement = evt.target.closest('.element');
        evt.target.classList.toggle('element__heart_active');
        console.log(likeElement);
    });
/*Открытиее попапа*/
    
    elementList.prepend(newCartElement);
});

//Добавление новой карточки