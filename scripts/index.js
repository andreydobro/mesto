const popupEdit = document.querySelector('.popup');
const buttonOpenEdit = document.querySelector('.profile__edit-button_opened');
const buttonCloseEdit = document.querySelector('.popup__icon-close');
const popupFormEdit = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_name_edit');
const aboutInput = document.querySelector('.popup__input_about_edit');
const buttonSaveEdit = document.querySelector('.popup__bottom-save');
const buttonSaveAdd = document.querySelector('.popup__bottom-save_add');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const buttonOpenAdd = document.querySelector('.profile__add-button_opened');
const popupAdd = document.querySelector('.popup-add');
const popupImage = document.querySelector('.popup_image');
const elementText = document.querySelector('.element__title');
const template = document.querySelector('.template');
const elements = document.querySelector('.elements');
const cardName = document.querySelector('.popup__input_name_add');
const cardLink = document.querySelector('.popup__input_about_add');
const formAdd = document.querySelector('.popup__form-add');
const buttonCloseImage = document.querySelector('.popup__icon-close_image');
const elementFoto = document.querySelector('.element__foto');
const imageFoto = document.querySelector('.popup__image-foto');
const imageName = document.querySelector('.popup__text');
const buttonCloseAdd = document.querySelector('.popup__icon-close_add');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

document.addEventListener('keydown', function (evt) {
    console.log(evt);
    if(evt.keyCode === 27) {
        closePopup(popupEdit);
        closePopup(popupAdd);
        closePopup(popupImage);
    }
});

buttonCloseEdit.addEventListener('click', function () {
    closePopup(popupEdit)
});

buttonCloseAdd.addEventListener('click', function () {
    closePopup(popupAdd)
});

buttonCloseImage.addEventListener('click', function () {
    closePopup(popupImage)
});

buttonOpenEdit.addEventListener('click', function () {
    openPopup(popupEdit);
    editPopupInputValue();
});

buttonOpenAdd.addEventListener('click', function () {
    openPopup(popupAdd);
});

function editPopupInputValue() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup(popupEdit);
}

function handleDeleteCard(evt) {
    const cardElement = evt.target.closest('.element');
    cardElement.remove();
}

function handleLikeCard(evt) {
    const likeElement = evt.target.closest('.element');
    evt.target.classList.toggle('element__heart_active');
}

function openImagePopup(evt) {
    const cardImage = evt.target.closest('.element__foto');
    imagiLink = cardImage.getAttribute('src');
    imagiAlt = cardImage.getAttribute('alt');
    imageFoto.setAttribute('src', imagiLink);
    imageName.setAttribute('alt', imagiAlt);
    imageName.textContent = imagiAlt;
    openPopup(popupImage);
};

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const card = {
        name: cardName.value,
        link: cardLink.value
    }
    formAdd.reset();
    renderCard(card);
    closePopup(popupAdd);
}

function createCard(card) {
    const newCard = template.content.cloneNode(true);
    newCard.querySelector('.element__title').textContent = card.name
    const fotoElement = newCard.querySelector('.element__foto');
    fotoElement.textContent = card.name
    fotoElement.src = card.link
    fotoElement.alt = card.name

    /*Удаление элементов*/
    newCard
        .querySelector('.element__back')
        .addEventListener('click', handleDeleteCard);
    /*Постановка лайка*/
    newCard
        .querySelector('.element__heart')
        .addEventListener('click', handleLikeCard);
    /*Открытиее попапа c картинкой*/
    newCard
        .querySelector('.element__foto')
        .addEventListener('click', openImagePopup);

    return newCard;
}

initialCards.forEach(renderCard); 

function renderCard(card) {
    elements.prepend(createCard(card));
}

formAdd.addEventListener('submit', handleCardFormSubmit);
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);