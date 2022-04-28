export default class FormValidator {
  constructor(config, formSelector) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formSelector = formSelector;

    this.buttonElement = this._formSelector.querySelector(this._submitButtonSelector);
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  disabledButton = () => {
    this.buttonElement.classList.add(this._inactiveButtonClass);
    this.buttonElement.disabled = true;
  }

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      this.disabledButton();
    } else {
      // иначе сделай кнопку активной
      this.buttonElement.classList.remove(this._inactiveButtonClass);
      this.buttonElement.disabled = false;
    }
  }

  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass)// добавлен класс ошибки элементу input
    errorElement.textContent = errorMessage;// Установлен errorMessage в качестве значения textContent для span.
    errorElement.classList.add(this._errorClass);//Добавлен элементу span класс popup__input-error
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._formSelector.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass)// удаление класс ошибки с элемента input
    errorElement.classList.remove(this._errorClass);// удаление у элемента span класс popup__input-error
    errorElement.textContent = '';//Очистка свойства textContent элемента span.
  };

  resetErrors() {
    this._formSelector.querySelectorAll(this._inputSelector).forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    const inputList = Array.from(this._formSelector.querySelectorAll(this._inputSelector));

    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList);
      })
    })
  }

  enableValidation() {
    this._formSelector.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    this._setEventListeners()
  }
}


