export default class Card {
  constructor(data, selector, handleCardClick, handleRemoveCard) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userID = data.userId;
    this._ownerID = data.ownerId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard =handleRemoveCard;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._selector)
      .content.querySelector(".elements__item")
      .cloneNode(true);

    return templateElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementLike = this._element.querySelector(".elements__like");
    this._elementCountLike = this._element.querySelector(".elements__count-like");
    this._cardTitle = this._element.querySelector(".elements__title");
    this._cardImage = this._element.querySelector(".elements__photo");
    this._trash = this._element.querySelector(".elements__trash");
    this._cardTitle.textContent = this._title;
    this._elementCountLike.textContent = String(this._likes.length);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._isOwner();
    this._setEventListeners();
    return this._element;    
  }

  _isOwner() {
    if (this._userID !== this._ownerID) {
      this._trash.style.display = 'none'
    }
  }

  _addLike() {
    //Добавление лайка
    this._elementLike.classList.toggle("elements__like_active");
  }

  _removeCard() {
    //удаление карточки
    this._handleRemoveCard();
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", () => this._addLike()); ////слушатель добавления лайков
    this._trash.addEventListener("click", () => this._removeCard()); //слушатель удаления карточек
    this._cardImage.addEventListener("click", () => this._handleCardClick()); //слушатель открытия попапа фотографий
  }
}
