import { Popup } from "./Popup.js";

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(submitHandler) {
    super.open()
    this._submitHandler = submitHandler;
  }

  cardId() {
    return this._cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler();
    })
  }
}