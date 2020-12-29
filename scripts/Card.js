export default class Card {

  constructor(data, cardTemplateSelector = '#card', cardClickHandler) {
    this._title = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
    this.__handleCardClick = cardClickHandler;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const likeButtonElement = this._cardElement.querySelector('.card__like-button');
    likeButtonElement.addEventListener('click', () => {
      this._handleLikeButtonClick(likeButtonElement);
    });

    const removeButtonElement = this._cardElement.querySelector('.card__remove-button');
    removeButtonElement.addEventListener('click', () => {
      this._handleRemoveButtonClick();
    });

    const cardImageElement = this._cardElement.querySelector('.card__image');
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

  generateCard() {
    this._cardElement = this._getTemplate();
    this._setEventListeners();

    this._cardElement.querySelector('.card__title').textContent = this._title;

    const cardImageElement = this._cardElement.querySelector('.card__image');
    cardImageElement.src = this._link;
    cardImageElement.alt = this._title;

    return this._cardElement;
  }
}
