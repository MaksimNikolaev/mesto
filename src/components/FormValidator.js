export default class FormValidator {
  constructor(config, elementForm) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = elementForm;

    this.buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disabledButton = () => {
    this.buttonElement.classList.add(this._inactiveButtonClass);
    this.buttonElement.disabled = true;
  };

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._disabledButton();
    } else {
      // иначе сделай кнопку активной
      this.buttonElement.classList.remove(this._inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  };

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass); // добавлен класс ошибки элементу input
    errorElement.textContent = errorMessage; // Установлен errorMessage в качестве значения textContent для span.
    errorElement.classList.add(this._errorClass); //Добавлен элементу span класс popup__input-error
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass); // удаление класс ошибки с элемента input
    errorElement.classList.remove(this._errorClass); // удаление у элемента span класс popup__input-error
    errorElement.textContent = ""; //Очистка свойства textContent элемента span.
  };

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

/*   resetErrors() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  } */

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
