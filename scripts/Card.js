export default class Card {

    constructor(dataObj, cardSelector, handleCardClick) {
        this._name = dataObj.name;
        this._link = dataObj.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        console.log(dataObj)
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
        this._likeButton
            .classList.toggle('element__heart_active');
    }

    _setEventListeners() {
        this._deleteButton
            .addEventListener('click', () => {
                this._handleDeleteCard();
            });

        this._likeButton
            .addEventListener('click', () => {
                this._handleLikeCard();
            });

        this._cardImage
            .addEventListener('click', () => {
                this._handleCardClick();
            });
    }

    createCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__foto');
        this._cardName = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__heart');
        this._deleteButton = this._element.querySelector('.element__back');

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        console.log(this._getTemplate())
        return this._element;
        
    }
}