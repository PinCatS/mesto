export default class Card {

  constructor(data, cardTemplateSelector = '#card') {
    this._title = data.name;
    this._link = data.link;
    this._cardTemplateSelector = cardTemplateSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.card')
            .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    const cardElement = this._getTemplate();

    cardElement.querySelector('.card__title').textContent = this._title;

    const cardImageElement = cardElement.querySelector('.card__image');
    cardImageElement.src = this._link;
    cardImageElement.alt = this._title;

    return cardElement;
  }
}
