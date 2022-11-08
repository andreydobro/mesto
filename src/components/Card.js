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

    createCard() {
        this._element = this._getTemplate();

        this._cardImage = this._element.querySelector('.element__foto');
        this._cardName = this._element.querySelector('.element__title');
        this._likeButton = this._element.querySelector('.element__like');
        this._deleteButton = this._element.querySelector('.element__back');

        this._cardName.textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;

        this._setEventListeners();
        return this._element;
        
    }
}

/*export default class Card {
    constructor({ dataObj, cardSelector, userId, handleCardClick, handleDeleteIconClick, handleSetLike, handleRemoveLike }) {
      this._name = dataObj.name;
      this._link = dataObj.link;
      this._cardSelector = cardSelector;
      this._userId = userId;
      this._cardId = dataObj._id;
      this._cardOwnerId = dataObj.owner._id;
      this._handleCardClick = handleCardClick;
      this._handleDeleteIconClick = handleDeleteIconClick;
      this._likes = dataObj.likes;
      this._handleSetLike = handleSetLike;
      this._handleRemoveLike = handleRemoveLike;
    }
  
    // Получаем шаблон карточки
    _getTemplate() {
        const newCard = document
            .querySelector(this._cardSelector).content
            .querySelector('.element')
            .cloneNode(true);

        return newCard;
    }
  
    // Удаление карточки
    deleteCard() {
      this._element.remove();
      this._element = null;
    }

    _setEventListeners() {
        this._deleteButton
            .addEventListener('click', () => {
                this._handleDeleteCard();
            });

        this._likeButton
            .addEventListener('click', () => {
                if (this._likeButton.classList.contains('element__like_acttive')) {
                    this._handleLikeCard(this._cardId);
                } else {
                    this._hasDeleteButton(this._cardId);
                }
            });

        this._cardImage
            .addEventListener('click', () => {
                this._handleCardClick();
            });
    }
  
    // Генерируем готовую карточку
    generateCard() {
      this._element = this._getTemplate();
      this._image = this._element.querySelector('.element__foto');
      this._likeBtn = this._element.querySelector('.element__like');
      this._likesNumber = this._element.querySelector('.element__like-count');
      this._deleteBtn = this._element.querySelector('.element__back');
  
      this._image.src = this._link;
      this._image.alt = this._name;
      this._element.querySelector('.element__title').textContent = this._name;
      this._hasDeleteButton();
      this._isCardLiked();
      this._likesNumber.textContent = this._likes.length;
      this._setEventListeners();
  
      return this._element;
    }
  
    // Проверка, стоит ли лайк на карточке
    _isCardLiked() {
      if (this._likes.some((user) => {
        return this._userId === user._id;
      })) {
        this._likeBtn.classList.add('element__like_active');
      }
    }
  
    // поставить/удалить лайк, изменение количества лайков
    handleLikeCard(dataObj) {
      this._likes = dataObj.likes;
      this._likesNumber.textContent = this._likes.length;
      this._likeBtn.classList.toggle('element__like_active');
    }
  
    // проверяем владельца карточки и убираем кнопку Delete
    _hasDeleteBtn() {
      if (this._userId !== this._cardOwnerId) {
        this._deleteBtn.remove();
      }
    }
  }*/