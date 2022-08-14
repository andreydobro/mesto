let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button_opened');
let closeButtton = popup.querySelector('.popup__icon-close');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name_edit');
let aboutInput = document.querySelector('.popup__input_about_edit');
let saveButton = document.querySelector('.popup__bottom-save');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let openPopup = function () {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
}

let closePopup = function () {
    popup.classList.remove('popup_opened');
}

nameInput.setAttribute('value', profileName.textContent);
aboutInput.setAttribute('value', profileAbout.textContent);


function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    closePopup();
}

popupForm.addEventListener('submit', formSubmitHandler);
openButton.addEventListener('click', openPopup);
closeButtton.addEventListener('click', closePopup);
saveButton.addEventListener('click', closePopup);