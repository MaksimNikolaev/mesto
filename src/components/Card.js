export default class Card {
  constructor(
    data,
    selector,
    handleCardClick,
    handleRemoveCard,
    handleLikeClickAdd,
    handleLikeClickRemove
  ) {
    this._title = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userID = data.userId;
    this._ownerID = data.ownerId;
    this._selector = selector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveCard = handleRemoveCard;
    this._handleLikeClickAdd = handleLikeClickAdd;
    this._handleLikeClickRemove = handleLikeClickRemove;
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
    this._elementCountLike = this._element.querySelector(
      ".elements__count-like"
    );
    this._cardTitle = this._element.querySelector(".elements__title");
    this._cardImage = this._element.querySelector(".elements__photo");
    this._trash = this._element.querySelector(".elements__trash");
    this._cardTitle.textContent = this._title;
    this._elementCountLike.textContent = String(this._likes.length);
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._isOwner();
    this._isLiked();
    this._setEventListeners();
    return this._element;
  }

  _isOwner() {
    if (this._userID !== this._ownerID) {
      /* this._trash.style.display = 'none' */
      this._removeIconTrash(this._trash);
    }
  }

  _isLiked() {
    this._likes.forEach((user) => {
      if (user._id === this._userID) {
        this.addLike();
      } else {
        this.removeLike();
      }
    });
  }

  _removeIconTrash(element) {
    element.remove();
    element = null;
  }

  addLike() {
    this._elementLike.classList.add("elements__like_active");
  }

  removeLike() {
    this._elementLike.classList.remove("elements__like_active");
  }

  setCountLike(data) {
    this._elementCountLike.textContent = String(data.likes.length);
  }

  removeCard() {
    //удаление карточки
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", () => {
      if (this._elementLike.classList.contains("elements__like_active")) {
        this._handleLikeClickRemove();
      } else {
        this._handleLikeClickAdd();
      }
    });
    this._trash.addEventListener("click", () => this._handleRemoveCard()); //слушатель удаления карточек
    this._cardImage.addEventListener("click", () => this._handleCardClick()); //слушатель открытия попапа фотографий
  }
}
