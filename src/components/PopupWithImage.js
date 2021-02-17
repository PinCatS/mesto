import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(containerSelector) {
    super(containerSelector);
    this._imageElement = this._popupElement.querySelector('.image-popup__image');
    this._imageCaptionElement = this._popupElement.querySelector('.image-popup__caption');
  }

  open(name, link) {
    this._imageElement.src = link;
    this._imageElement.alt = name;

    this._imageCaptionElement.textContent = name;
    super.open();
  }
}
