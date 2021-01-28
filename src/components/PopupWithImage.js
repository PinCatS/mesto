import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({src, title}, containerSelector) {
    super(containerSelector);
    this._src = src;
    this._title = title;
  }

  open() {
    const popupImage = this._popupElement.querySelector('.image-popup__image');
    popupImage.src = this._src;
    popupImage.alt = this._title;

    this._popupElement.querySelector('.image-popup__caption').textContent = this._title;
    super.open();
  }
}
