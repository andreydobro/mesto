class Card {

    constructor(obj, cardSelector, /*openImagePopup, handleDeleteCard*/) {
        this._name = obj.name;
        this._link = obj.link;
        this._cardSelector = cardSelector;
        //this._openImagePopup = openImagePopup;
        /*this._handleDeleteCard = handleDeleteCard;*/
    }

    _getTemplate() {
        const newCard = document
        .querySelector(this._cardSelector).content
        .querySelector('.element')
        .cloneNode(true);

        return newCard;
    }

    _handleDeleteCard() {
        this._element.remove();
        this._element = null;
    }

    _handleLikeCard() {
        this._element
        .querySelector('.element__heart')
        .classList.toggle('element__heart_active');
    }

    _openImagePopup() {
        imageFoto.src = this._link;
        popups.classList.add('popup_image')
    }

    _setEventListeners() {
        this._element
        .querySelector('.element__back')
        .addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._element
        .querySelector('.element__heart')
        .addEventListener('click', () => {
            this._handleLikeCard();
        });

       this._element
        .querySelector('.element__foto')
        .addEventListener('click', () => {
            this._openImagePopup();
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.element__foto').src = this._link;
        this._element.querySelector('.element__foto').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        
    
        this._setEventListeners();
        return this._element;
    }
}

initialCards.forEach((initialCard) => {
    const card = new Card(initialCard, '.template');
    const newCard = card.generateCard();

    document.querySelector('.elements').append(newCard);
})