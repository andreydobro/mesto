import {
    imageFoto,
    popupImageName
} from './index.js'

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    constructor(popupSelector) {
        super(popupSelector);
    }

    open(cardImage) {
        imageFoto.src = cardImage.link;
        imageFoto.alt = cardImage.name;
        popupImageName.textContent = cardImage.name;
        super.open()
      }
}