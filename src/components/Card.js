export default class Card {

  constructor(data, cardTemplateSelector = '#card', cardClickHandler, cardLikeHandler, cardDeleteHandler) {
    this._cardId = data._id;
    this._title = data.name;
    this._link = data.link;
    this._likesCount = data.likes.length;
    this._cardTemplateSelector = cardTemplateSelector;
    this._handleCardClick = cardClickHandler;
    this._handleCardLike = cardLikeHandler;
    this._handleCardDelete = cardDeleteHandler;
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

    this._cardImageElement.addEventListener('click', evt => {
      this._handleCardClick(evt);
    });

    if (this._handleCardDelete) {
      this._removeButtonElement.addEventListener('click', () => {
        this._handleCardDelete(this._cardId, this._remove.bind(this));
      });
    }
  }

  _handleLikeButtonClick() {
    this._handleCardLike({
      id: this._cardId,
      likeCounterElement: this._likeCounterElement,
      isActive: this._likeButtonElement.classList.contains('card__like-button_active')
    });
    this._likeButtonElement.classList.toggle('card__like-button_active');
  }

  _remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard(isLikeSet = false) {
    this._cardElement = this._getTemplate();
    this._likeButtonElement = this._cardElement.querySelector('.card__like-button');
    if (isLikeSet) this._likeButtonElement.classList.add('card__like-button_active');

    this._removeButtonElement = this._cardElement.querySelector('.card__remove-button');
    if (!this._handleCardDelete) {
      this._removeButtonElement.classList.remove('card__remove-button_visible');
      this._removeButtonElement.disabled = true;
    }

    this._cardImageElement = this._cardElement.querySelector('.card__image');
    this._likeCounterElement = this._cardElement.querySelector('.card__like-counter');

    this._setEventListeners();

    this._cardElement.querySelector('.card__title').textContent = this._title;
    this._likeCounterElement.textContent = this._likesCount;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._title;

    return this._cardElement;
  }
}
