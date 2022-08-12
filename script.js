let popup = document.querySelector('.popup');
let openButton = document.querySelector('.profile__edit-button_opened');
let closeButtton = popup.querySelector('.popup__icon-close');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_name');
let aboutInput = document.querySelector('.popup__input_about');
let saveButton = document.querySelector('.popup__bottom-save');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let openPopup = function () {
    popup.classList.toggle('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButtton.addEventListener('click', openPopup);
saveButton.addEventListener('click', openPopup);

let namePopup = function () {
    nameInput.setAttribute('value', profileName.textContent);
    aboutInput.setAttribute('value', profileAbout.textContent);
}

namePopup();

function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
}

popupForm.addEventListener('submit', formSubmitHandler);