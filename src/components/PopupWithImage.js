import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._photoFull = this._popup.querySelector(".popup__photo");
    this._photoCaption = this._popup.querySelector(".popup__caption");
  }
  open(title, link) {
    this._photoFull.src = link;
    this._photoCaption.textContent = title;
    this._photoFull.alt = title;
    super.open();
  }
}
