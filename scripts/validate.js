'use strict';
function enableValidation(settings) {

  /* Internal functions */
  function hasInvalidInput(inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);
  }

  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(globalSettings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(globalSettings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  function showInputError(formElement, inputElement, errorMessage) {
    inputElement.classList.add(globalSettings.inputErrorClass);
    const errorElement = formElement.querySelector(`.popup__input-error_name_${inputElement.name}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(globalSettings.errorClass);
  }

  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.popup__input-error_name_${inputElement.name}`);
    errorElement.classList.remove(globalSettings.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(globalSettings.inputErrorClass);
  }

  function validateInput(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(globalSettings.inputSelector));
    const buttonElement = formElement.querySelector(globalSettings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', evt => {
        validateInput(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

  /* User API */
  function resetFormValidityState(...forms) {
    forms.forEach(formElement => {
      const inputList = Array.from(formElement.querySelectorAll(globalSettings.inputSelector));
      const buttonElement = formElement.querySelector(globalSettings.submitButtonSelector);
      inputList.forEach(inputElement => hideInputError(formElement, inputElement))
      toggleButtonState(inputList, buttonElement);
    });
  }

  function notifyFromsAboutInputChange(...inputs) {
    const inputEvent = new Event('input');
    inputs.forEach(input => input.dispatchEvent(inputEvent));
  }


  /* Main entry logic for validation */
  const globalSettings = settings;

  const formList = Array.from(document.querySelectorAll(globalSettings.formSelector));
  formList.forEach(formElement => {
    formElement.addEventListener('submit', evt => evt.preventDefault());
    setEventListeners(formElement);
  })

  /* Expose API */
  return {
    resetFormValidityState,
    notifyFromsAboutInputChange,
  }
}
