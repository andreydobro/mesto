import Popup from "../components/Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image-foto');
        this._imageName = this._popup.querySelector('.popup__text')
    }

    open(cardImage) {
        this._image.src = cardImage.link;
        this._image.alt = cardImage.name;
        this._imageName.textContent = cardImage.name;
        super.open()
      }
}