import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor({ containerSelector, handleFormSubmit }) {
    super(containerSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._values);
      this.close();
    });
  }

  open(values) {
    super.open();
    this._values = values;
  }
}
