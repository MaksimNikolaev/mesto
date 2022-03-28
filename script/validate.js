function enableValidation(config) {
  const form = document.querySelector(config.formSelector);
  form.addEventListener('input', (event) => handleFormInput(event, config));
}

function handleFormInput(event, config) {
  const form = event.currentTarget;
  const input = event.target;
  setCustomError(input, config);
  setSubmitButtonState(form, config);
}

function setCustomError(input, config) {
  const span = document.querySelector(`#${input.id}-error`);
  const inputError = document.querySelector(`#${input.id}`);
  const validity = input.validity;
  input.setCustomValidity('');
    if (!validity.valid){
    span.classList.add(config.errorClass);
    inputError.classList.add(config.inputErrorClass);
    span.textContent = input.validationMessage;
  }
  else{
    span.classList.remove(config.errorClass);
    inputError.classList.remove(config.inputErrorClass);
    span.textContent = '';
  }

}

function setSubmitButtonState(form, config) {
  const button = form.querySelector(config.submitButtonSelector);
  const isValid = form.checkValidity();
  if (!isValid){
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.disabled = false;
    button.classList.remove(config.inactiveButtonClass);
  }
}

enableValidation({
  formSelector: '.popup__form_data_edit',
  inactiveButtonClass: 'popup__button_disabled',
  submitButtonSelector: '.popup__button',
  errorClass: '.popup__input-error',
  inputErrorClass: 'popup__input_type_error',
});

enableValidation({
  formSelector: '.popup__form_data_add',
  inactiveButtonClass: 'popup__button_disabled',
  submitButtonSelector: '.popup__button',
  errorClass: '.popup__input-error',
  inputErrorClass: 'popup__input_type_error',
});
