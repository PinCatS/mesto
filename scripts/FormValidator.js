export default class FormValidator {
  constructor(formElement, config) {
    this._formElement = formElement;
    this._config = config;
  }

  /* Public API */
  enableValidation() {
    this._setEventListeners(this._formElement);
  }

  resetFormValidityState() {
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    inputList.forEach(inputElement => this._hideInputError(inputElement))
    this._toggleButtonState(buttonElement);
  }

  notifyFormsAboutInputChange() {
    const inputElementList = this._formElement.querySelectorAll(this._config.inputSelector);
    const inputEvent = new Event('input');
    inputElementList.forEach(input => input.dispatchEvent(inputEvent));
  }


  /* Private methods */
  _setEventListeners(formElement) {
    const inputList = this._formElement.querySelectorAll(this._config.inputSelector);
    const buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);

    this._toggleButtonState(formElement, buttonElement);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._validateInput(inputElement);
        this._toggleButtonState(buttonElement);
      });
    });
  }

  _toggleButtonState(buttonElement) {
    if (this._hasInvalidInput()) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput() {
    return !this._formElement.checkValidity();
  }

  _validateInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    inputElement.classList.add(this._config.inputErrorClass);
    const errorElement = this._formElement.querySelector(`.popup__input-error_name_${inputElement.name}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.popup__input-error_name_${inputElement.name}`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }
}
