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
    this._likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick();
    });

    this._cardElement.querySelector('.card__remove-button').addEventListener('click', () => {
      this._handleRemoveButtonClick();
    });

    this._cardImageElement.addEventListener('click', evt => {
      this._handleCardClick(evt);
    });
  }

  _handleLikeButtonClick() {
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _handleRemoveButtonClick() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._likeButtonElement = this._cardElement.querySelector('.card__like-button');
    this._cardImageElement = this._cardElement.querySelector('.card__image');

    this._setEventListeners();

    this._cardElement.querySelector('.card__title').textContent = this._title;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;

    return this._cardElement;
  }
}
