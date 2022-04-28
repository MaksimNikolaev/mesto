import Popup from '../components/Popup.js'
export default class PopupWithForm extends Popup {
  constructor(selectorPopup, callBackSubmitForm) {
    super(selectorPopup);
    this._callBackSubmitForm = callBackSubmitForm;
    this._form = this._selectorPopup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach(input => values[input.name] = input.value);
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => {
      this._callBackSubmitForm(this._getInputValues())
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
