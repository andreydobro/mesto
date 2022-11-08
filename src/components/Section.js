/*export default class Section {
  
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach(item => this._renderer(item))
  }

  addItem(element) {
    this._container.prepend(element);
  }
}*/


/*export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(data) {
    data.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
    //console.log(this._container.prepend(element))
  }
}*/


export default class Section {

  constructor({ renderer }, selector) {
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  
  renderItems(items) {
    //console.log(items.forEach(item => this.#renderer(item)))
    items.forEach(item => this._renderer(item))
  }

  
  addItem(element) {
    this._container.prepend(element);
  }
}