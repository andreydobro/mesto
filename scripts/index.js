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
let popupAdd = document.querySelector('.popup-add');
let popupImage = document.querySelector('.popup_image');
let elementText = document.querySelector('.element__title');
let cartTemplate = document.querySelector('.cart__template');
let elementList = document.querySelector('.elements');
let inputTitle = document.querySelector('.popup__input_name_add');
let inputLink = document.querySelector('.popup__input_about_add');
let formAdd = document.querySelector('.popup__form-add');
let buttonCloseImage = document.querySelector('.popup__icon-close_image');
let elementFoto = document.querySelector('.element__foto');
let imagePopup = document.querySelector('.popup__image');
let imageFoto = document.querySelector('.popup__image-foto');
let imageName = document.querySelector('.popup__name-image');
let buttonCloseAdd = document.querySelector('.popup__icon-close_add');
let popupImageFoto = document.querySelector('.popup__image-foto');



function openPopup(popup) {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
    
}

function close (popup) {
    popup.classList.remove('popup_opened');
}

closeButtton.addEventListener('click', function () {
    close(popup)
});

buttonCloseAdd.addEventListener('click', function () {
    close(popupAdd)
});

buttonCloseImage.addEventListener('click', function () {
    close(imagePopup)
});

editOpenButton.addEventListener('click', function () {
    openPopup(popup);
});

addOpenButton.addEventListener('click', function () {
    openPopup(popupAdd);
});



function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    close(popup);
}

function formSubmitHandlerAdd(e) {
    e.preventDefault();
    const cardContent = {
        name: inputTitle.value,
        link: inputLink.value
    }
    const text = inputTitle.value;
    const link = inputLink.value;
    inputTitle.value = '';
    inputLink.value = '';

    newCard(cardContent);
    close(popupAdd);
}

function handlerDelit(evt) {
    const cardElement = evt.target.closest('.element');
    cardElement.remove();
}

function handlerLike(evt) {
    const likeElement = evt.target.closest('.element');
    evt.target.classList.toggle('element__heart_active');
    console.log(likeElement);
}

function openImagePopup(evt) {
    const cardImage = evt.target.closest('.element__foto');
    imageLink = cardImage.getAttribute('src');
    imageAlt = cardImage.getAttribute('alt');
    popupImageFoto.setAttribute('src', imageLink);
    popupImageFoto.setAttribute('alt', imageAlt);
    imageName.textContent = imageAlt;
    openPopup(imagePopup);
}

function newCard(text) {
    const newCartElement = cartTemplate.content.cloneNode(true);
    newCartElement.querySelector('.element__title').textContent = text.name
    newCartElement.querySelector('.element__foto').textContent = text.name
    newCartElement.querySelector('.element__foto').src = text.link
    newCartElement.querySelector('.element__foto').alt = text.name

    /*Удаление элементов*/
    newCartElement
        .querySelector('.element__back')
        .addEventListener('click', handlerDelit);
    /*Постановка лайка*/
    newCartElement
        .querySelector('.element__heart')
        .addEventListener('click', handlerLike);
    /*Открытиее попапа c картинкой*/
    newCartElement
    .querySelector('.element__foto')
    .addEventListener('click', openImagePopup);

    elementList.prepend(newCartElement)
}

/*Копия элемента*/
initialCards.forEach(newCard);

formAdd.addEventListener('submit', formSubmitHandlerAdd);
popupForm.addEventListener('submit', formSubmitHandler);
