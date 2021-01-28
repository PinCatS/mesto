import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ containerSelector, handleFormSubmit }) {
    super(containerSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll('.popup__input');

    const formData = {};
    inputList.forEach(input => formData[input.name] = input.value);

    return formData;
  }

  setInputValues(values) {
    const popupForm = this._popupElement.querySelector('.popup__form');
    Object.keys(values).forEach(inputName => {
      popupForm[inputName].value = values[inputName];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupElement.querySelector('.popup__form').reset();
  }
}
