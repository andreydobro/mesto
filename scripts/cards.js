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

/*class Card {
    constructor(name, link, handleDeleteCard, handleLikeCard, handleOpenPopup) {
        this._name = name;
        this._link = link;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeCard = handleLikeCard;
        this._handleOpenPopup = handleOpenPopup;
    }

    #getTemplate() {
        const cardElement = document
            .querySelector('.template')
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    #handleDeleteCard() {
        this._element.remove();
    }

    #handleLikeCard() {
        this._element
            .querySelector('.element__heart')
            .classList.toggle('element__heart_active');
    }

    #handleOpenPopup() {
        popupImage.src = this._image;
        popupElement.classList.add('popup_opened');
    }

    #handleClosePopup() {
        popupImage.src = "";
        popupElement.classList.remove('popup_opened');
    }

    #setEventListener() {
        this._element.querySelector('.element__back')
            .addEventListener('click', () => {
                this.#handleDeleteCard();
            });

        this._element
            .querySelector('.element__heart')
            .addEventListener('click', () => {
                this.#handleLikeCard();
            });

        this._element
            .querySelector('.popup_opened')
            .addEventListener('click', () => {
                this.#handleOpenPopup();
                
            });
    }

    generateCard() {
        this._element = this.#getTemplate();
        this._element.querySelector('.element__foto').src = this._link;
        this._element.querySelector('.element__foto').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        this.#setEventListener();
        return this._element;
    }
}

initialCards.forEach((initialCard) => {
    const card = new Card(initialCard.name, initialCard.link);
    const cardElement = card.generateCard();

    document.querySelector('.elements').append(cardElement);
})*/