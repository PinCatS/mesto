export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElements() {
    this._items.forEach(item => {
      const redrededItem = this._renderer(item);
      this.addItem(redrededItem);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
