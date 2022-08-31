const popup = document.querySelector('.popup');
const buttonOpenEdit = document.querySelector('.profile__edit-button_opened');
const buttonClose = popup.querySelector('.popup__icon-close');
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
const titleInput = document.querySelector('.popup__input_name_add');
const linkInput = document.querySelector('.popup__input_about_add');
const formAdd = document.querySelector('.popup__form-add');
const buttonCloseImage = document.querySelector('.popup__icon-close_image');
const elementFoto = document.querySelector('.element__foto');
const imageFoto = document.querySelector('.popup__image-foto');
const imageName = document.querySelector('.popup__text');
const buttonCloseAdd = document.querySelector('.popup__icon-close_add');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function close (popup) {
    popup.classList.remove('popup_opened');
}

buttonClose.addEventListener('click', function () {
    close(popup)
});

buttonCloseAdd.addEventListener('click', function () {
    close(popupAdd)
});

buttonCloseImage.addEventListener('click', function () {
    close(popupImage)
});

buttonOpenEdit.addEventListener('click', function () {
    openPopup(popup);
    popupInputValueEdit();
});

buttonOpenAdd.addEventListener('click', function () {
    openPopup(popupAdd);
});

function popupInputValueEdit() {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

function handleProfileFormSubmit(evt) { 
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    close(popup);
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

function createCard(text) {
    const newCard = template.content.cloneNode(true);
    newCard.querySelector('.element__title').textContent = text.name
    const fotoElement = newCard.querySelector('.element__foto');
    fotoElement.textContent = text.name
    fotoElement.src = text.link
    fotoElement.alt = text.name
    
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

initialCards.forEach((text) => {
    const newCard = createCard(text);
    elements.prepend(newCard);
  });

  function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardContent = {
        name: titleInput.value,
        link: linkInput.value
    }
    const text = titleInput.value;
    const link = linkInput.value;
    formAdd.reset();

    elements.prepend(createCard(text));
    close(popupAdd);
}


formAdd.addEventListener('submit', handleCardFormSubmit);
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);
