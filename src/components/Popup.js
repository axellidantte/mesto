export class Popup {
    constructor(popupSelector) {
        this._popup = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }
    open() {
        this._popup.classList.add("pop-up_opened");
        document.addEventListener('keyup', this._handleEscClose)
    }
    close() {
        this._popup.classList.remove("pop-up_opened");
        document.removeEventListener('keyup', this._handleEscClose)
    }
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }
    setEventListeners() {
        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("pop-up_opened") || evt.target.classList.contains('pop-up__exit-button')) {
                this.close();
            }
        });
    }
}