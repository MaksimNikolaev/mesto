const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
 });
 
 }

const showInputError = (formElement,inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass)// добавлен класс ошибки элементу input
  errorElement.textContent = errorMessage;// Установлен errorMessage в качестве значения textContent для span.
  errorElement.classList.add(config.errorClass);//Добавлен элементу span класс popup__input-error
};

const hideInputError = (formElement, inputElement, config) => {
   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
   inputElement.classList.remove(config.inputErrorClass)// удаление класс ошибки с элемента input
   errorElement.classList.remove(config.errorClass);// удаление у элемента span класс popup__input-error
   errorElement.textContent = '';//Очистка свойства textContent элемента span.
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

function setEventListeners (formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function (){
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
     return !inputElement.validity.valid;
  })
}

const toggleButtonState  = (inputList, buttonElement, config) =>{
  if (hasInvalidInput(inputList)) {
   // сделай кнопку неактивной
   buttonElement.classList.add(config.inactiveButtonClass);
   buttonElement.disabled = true;
 } else {
   // иначе сделай кнопку активной
   buttonElement.classList.remove(config.inactiveButtonClass);
   buttonElement.disabled = false;
 }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__input-error'
}); 