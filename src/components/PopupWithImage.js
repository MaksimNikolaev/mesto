import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._photoFull = document.querySelector(".popup__photo");
    this._photoCaption = document.querySelector(".popup__caption");
  }
  open(title, link) {
    this._photoFull.src = link;
    this._photoCaption.textContent = title;
    this._photoFull.alt = title;
    super.open();
  }
}
