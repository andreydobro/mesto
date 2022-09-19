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
const popupImage = document.querySelector('.popup_image');
const elementText = document.querySelector('.element__title');
const template = document.querySelector('.template');
const elements = document.querySelector('.elements');
const cardName = document.querySelector('.popup__input_name_add');
const cardLink = document.querySelector('.popup__input_about_add');
const formAdd = document.querySelector('.popup__form-add');
const elementFoto = document.querySelector('.element__foto');
const imageFoto = document.querySelector('.popup__image-foto');
const popupImageName = document.querySelector('.popup__text');
const popups = document.querySelectorAll('.popup');

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
    if (evt.target.classList.contains('popup')  || evt.target.classList.contains('popup__icon-close')) {
        closePopup(evt.currentTarget);
      }
}

buttonOpenEdit.addEventListener('click', function () {
    openPopup(popupEdit);
    editPopupInputValue();
    removeSubmitButton(buttonSaveEdit, validationConfig);
});

buttonOpenAdd.addEventListener('click', function () {
    openPopup(popupAdd);
    addSubmitButton(buttonSaveAdd, validationConfig);
    removeSubmitButton(popupAdd, validationConfig);
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
    const target = evt.target;
    imageFoto.src = target.src;
    imageFoto.alt = target.alt;
    popupImageName.textContent = target.alt;
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
        fotoElement
        .addEventListener('click', openImagePopup);

    return newCard;
}

initialCards.forEach(renderCard);

function renderCard(card) {
    elements.prepend(createCard(card));
}

formAdd.addEventListener('submit', handleCardFormSubmit);
popupFormEdit.addEventListener('submit', handleProfileFormSubmit);