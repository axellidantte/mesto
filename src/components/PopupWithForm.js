import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { submitHandler }) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(".pop-up__form");
  }

  _getInputValues() {
    this._inpValue = {};
    this._inputList = this._form.querySelectorAll(".pop-up__input");
    this._inputList.forEach((input) => (this._inpValue[input.name] = input.value));
    return this._inpValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}