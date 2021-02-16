import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ containerSelector, handleFormSubmit }) {
    super(containerSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
    this._submitButton = this._popupElement.querySelector('.popup__save-button');
  }

  _getInputValues() {
    const formData = {};
    this._inputList.forEach(input => formData[input.name] = input.value);
    return formData;
  }

  _showLoader() {
    this._submitButton.textContent += '...';
  }

  _hideLoader() {
    this._submitButton.textContent = this._submitButton.textContent.replace('...', '');
  }

  setInputValues(values) {
    Object.keys(values).forEach(inputName => {
      this._form[inputName].value = values[inputName];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._showLoader();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
    this._hideLoader();
  }
}
