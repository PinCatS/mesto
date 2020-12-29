export default class Card {

  constructor(data, cardTemplateSelector = '#card', cardClickHandler) {
    this._title = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = cardClickHandler;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const likeButtonElement = this._getLikeButtonElement();
    likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick(likeButtonElement);
    });

    const removeButtonElement = this._getRemoveButtonElement();
    removeButtonElement.addEventListener('click', () => {
      this._handleRemoveButtonClick();
    });

    const cardImageElement = this._getImageElement();
    cardImageElement.addEventListener('click', evt => {
      this._handleCardClick(evt);
    });
  }

  _handleLikeButtonClick(likeButtonElement) {
    likeButtonElement.classList.toggle('card__like-button_active');
  }

  _handleRemoveButtonClick() {
    this._cardElement.remove();
  }

  _getImageElement() {
    return this._cardElement.querySelector('.card__image');
  }

  _getLikeButtonElement() {
    return this._cardElement.querySelector('.card__like-button');
  }

  _getRemoveButtonElement() {
    return this._cardElement.querySelector('.card__remove-button');
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.card__title').textContent = this._title;

    const cardImageElement = this._getImageElement();
    cardImageElement.src = this._link;
    cardImageElement.alt = this._title;

    return this._cardElement;
  }
}
