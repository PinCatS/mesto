export default class Section {
  constructor(containerSelector, { items = [], renderer = item => item } ) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItemList(items) {
    this._items = items;
    return this;
  }

  setRenderer(renderer) {
    this._renderer = renderer;
    return this;
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
