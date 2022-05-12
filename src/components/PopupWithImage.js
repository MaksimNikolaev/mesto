import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selectorPopup) {
    super(selectorPopup);
    this._photoFull = this._popup.querySelector(".popup__photo");
    this._photoCaption = this._popup.querySelector(".popup__caption");
  }
  open({name, link}) {
    this._photoFull.src = link;
    this._photoCaption.textContent = name;
    this._photoFull.alt = name;
    super.open();
  }
}
