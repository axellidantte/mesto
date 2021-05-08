export class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._title = data.name;
        this._image = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".elements__card").cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector(".elements__like-button").addEventListener("click", (evt) => {
            this._toggleLike(evt);
        });

        this._element.querySelector(".elements__delete-button").addEventListener("click", (evt) => {
            this._deleteButton(evt);
        });

        this._element.querySelector(".elements__card-image").addEventListener("click", () => this._handleCardClick(this._image, this._title));
    }

    _toggleLike(evt) {
        evt.currentTarget.classList.toggle("elements__like-button_active");
    }

    _deleteButton() {
        this._element.remove();
        this._element = null;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".elements__title").textContent = this._title;
        this._element.querySelector(".elements__title").alt = this._title;
        this._element.querySelector(".elements__card-image").src = this._image;

        return this._element;
    }
}