export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(evt) {
    if (evt.key == 'Escape') this.close();
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) this.close();
  }

  setEventListeners() {
    this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => this.close());
    this._popupElement.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }

  open() {
    this._handleEscCloseBinded = this._handleEscClose.bind(this);
    document.addEventListener('keydown', this._handleEscCloseBinded);

    this._popupElement.classList.add('popup_opened');
  }

  close() {
    this._popupElement.classList.remove('popup_opened');

    document.removeEventListener('keydown', this._handleEscCloseBinded);
  }
}
