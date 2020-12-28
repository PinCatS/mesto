'use strict';
function enableValidation(config) {

  /* Internal functions */
  function hasInvalidInput(formElement) {
    return !formElement.checkValidity();
  }

  function toggleButtonState(formElement, buttonElement) {
    if (hasInvalidInput(formElement)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  function showInputError(formElement, inputElement, errorMessage) {
    inputElement.classList.add(config.inputErrorClass);
    const errorElement = formElement.querySelector(`.popup__input-error_name_${inputElement.name}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.popup__input-error_name_${inputElement.name}`);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(config.inputErrorClass);
  }

  function validateInput(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function setEventListeners(formElement) {
    const inputList = formElement.querySelectorAll(config.inputSelector);
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(formElement, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        validateInput(formElement, inputElement);
        toggleButtonState(formElement, buttonElement);
      });
    });
  }

  /* User API */
  function resetFormValidityState(...forms) {
    forms.forEach(formElement => {
      const inputList = formElement.querySelectorAll(config.inputSelector);
      const buttonElement = formElement.querySelector(config.submitButtonSelector);
      inputList.forEach(inputElement => hideInputError(formElement, inputElement))
      toggleButtonState(formElement, buttonElement);
    });
  }

  function notifyFromsAboutInputChange(...inputs) {
    const inputEvent = new Event('input');
    inputs.forEach(input => input.dispatchEvent(inputEvent));
  }


  /* Main entry logic for validation */
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    /* Do we need that submit event listener ? */
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement);
  })

  /* Expose API */
  return {
    resetFormValidityState,
    notifyFromsAboutInputChange,
  }
}
