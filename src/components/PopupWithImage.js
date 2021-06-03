import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    constructor(popupSelector, imageLink, imageAlt) {
        super(popupSelector);
        this._url = imageLink;
        this._title = imageAlt;
    }
    open({ link, name }) {
        this._title.textContent = name;
        this._url.src = link;
        this._url.alt = name;
        super.open();
    }
}