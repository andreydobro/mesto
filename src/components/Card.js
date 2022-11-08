export default class Card {
    constructor(dataObj, cardSelector, {handleCardClick, handleAddLike, handleRemoveLike, andleBackClick}, userId) {
        this._name = dataObj.name;
        this._link = dataObj.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleAddLike = handleAddLike;
        this._handleRemoveLike = handleRemoveLike;
        this._handleBackClick = andleBackClick;
        this._userId = userId;
        this._likeArray = dataObj.likes;
        this._owner = dataObj.owner
        this._likes = dataObj.likes;
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

    _clickLike() {
        if (this._likeButton.classList.contains('element__like_active')) {
          this._handleRemoveLike(this)
        } else {
          this._handleAddLike(this)
        }
      }

    _setStateLike(array) {
        if (array.find(item => item._id === this._userId)) {
          this._likeButton.classList.add('element__like_active');
        } else {
          this._likeButton.classList.remove('element__like_active');
        }
      }

    _handleLikeCard() {
        this._likeButton
            .classList.toggle('element__like_active');
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

    setLikeInfo(array) {
        this._likeArray = array;
        this._likeCount.textContent = this._likeArray.length;
        this._setStateLike(this._likeArray);
      }

    createCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__foto');
        this._cardName = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__back');

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        // определение количества лайков и статус кнопки лайк
      this._likeCount.textContent = this._likes.length;
      this._setStateLike(this._likes)
      console.log(this._likes);
  
      // корзина только у своих карточек
      if (this._userId !== this._owner._id) {
        this._deleteButton.remove();
      }

        this._setEventListeners();
        return this._element;
        
    }
}