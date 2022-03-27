function enableValidation() {
  const form = document.querySelector('.popup__form_data_edit');
  //form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', handleFormInput);

  const form2 = document.querySelector('.popup__form_data_add');
  //form2.addEventListener('submit', handleFormSubmit);
  form2.addEventListener('input', handleFormInput);
}

/* function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
  if (isValid) {

  }
} */

function handleFormInput(event) {
  const form = event.currentTarget;
  const input = event.target;

  //1. найти невалидные поля и  установить тексты ошибок
  setCustomError(input);
  //2. Показать ошибки пользователю
  setFielldError(input);
  //3. Деактивировать кнопку на невалидной форме.
  setSubmitButtonState(form);
}

function setCustomError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  const validity = input.validity;
    if (!validity.valid){
    span.classList.add('popup__input-error');
  }
  else{
    span.classList.remove('popup__input-error');
  }

}

function setFielldError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

function setSubmitButtonState(form) {
  const button = form.querySelector('.popup__button');
  const isValid = form.checkValidity();
  if (!isValid){
    button.classList.add('popup__button_disabled');
    button.disabled = true;
  } else {
    button.disabled = false;
    button.classList.remove('popup__button_disabled');
  }
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
