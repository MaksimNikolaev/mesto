import { photoFull, photoCaption, popupPhoto, openPopup } from './index.js'
export default class Card {
  constructor(data, selector) {
    this._title = data.name;
    this._link = data.link;
    this._selector = selector;
  }

  _getTemplate() {
    const templateElement = document
      .querySelector(this._selector)
      .content
      .querySelector(".elements__item")
      .cloneNode(true);

    return templateElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector(".elements__title");
    this._cardImage = this._element.querySelector(".elements__photo");
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;
    this._setEventListeners();
    return this._element;
  }

  _addLike() {//Добавление лайка
    this._element.querySelector('.elements__like').classList.toggle('elements__like_active');

  }

  _removeCard() {//удаление карточки
    this._element.remove();
    this._element = null;
  }

  _openPopupPhoto() {//открытие попапа Фото
    photoFull.src = this._link;
    photoCaption.textContent = this._title;
    openPopup(popupPhoto);
  }

  _setEventListeners() {
    this._element.querySelector('.elements__like').addEventListener('click', () => this._addLike());  ////слушатель добавления лайков
    this._element.querySelector('.elements__trash').addEventListener('click', () => this._removeCard());  //слушатель удаления карточек
    this._element.querySelector('.elements__photo').addEventListener('click', () => this._openPopupPhoto());//слушатель открытия попапа фотографий
  }

}
