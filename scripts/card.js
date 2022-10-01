export default class Card {
    #name;
    #link;
    #cardSelector;
    #element;
    #openImagePopup;

    constructor(obj, cardSelector, openImagePopup) {
        this.#name = obj.name;
        this.#link = obj.link;
        this.#cardSelector = cardSelector;
        this.#openImagePopup = openImagePopup;
    }

    #getTemplate() {
        const newCard = document
        .querySelector(this.#cardSelector).content
        .querySelector('.element')
        .cloneNode(true);

        return newCard;
    }

    #handleDeleteCard() {
        this.#element.remove();
        this.#element = null;
    }

    #handleLikeCard() {
        this.#element
        .querySelector('.element__heart')
        .classList.toggle('element__heart_active');
    }

    #handleCardClick() {
       this.#openImagePopup(this.#name, this.#link)
    }

    #setEventListeners() {
        this.#element
        .querySelector('.element__back')
        .addEventListener('click', () => {
            this.#handleDeleteCard();
        });

        this.#element
        .querySelector('.element__heart')
        .addEventListener('click', () => {
            this.#handleLikeCard();
        });

       this.#element
        .querySelector('.element__foto')
        .addEventListener('click', () => {
            this.#handleCardClick();
        });
    }

    createCard() {
        this.#element = this.#getTemplate();
        this.#element.querySelector('.element__foto').src = this.#link;
        this.#element.querySelector('.element__foto').alt = this.#name;
        this.#element.querySelector('.element__title').textContent = this.#name;

        
    
        this.#setEventListeners();
        return this.#element;
    }
}