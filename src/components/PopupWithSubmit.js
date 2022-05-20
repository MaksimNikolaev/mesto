import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(selectorPopup, {card}) {
    super(selectorPopup);
    this._card = card;
    this._callBackSubmitForm = this._callBackSubmitForm.bind(this);
    this._form = this._popup.querySelector(".popup__form");
  }

  _callBackSubmitForm() {
    this._card(this._data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", () => this._callBackSubmitForm());
  }

  open(data) {
    this._data = data;
    super.open();
  }
}