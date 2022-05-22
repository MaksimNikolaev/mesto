export default class Popup {
  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    //закрытие по кнопке Х
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.close();
    });
    //закрытие по оверлею
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  }
}
