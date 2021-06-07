export class Card {
    constructor({ name, link, likes, owner, _id }, cardSelector, { handleCardClick, handleCardDelete, handleCardLike }, userId) {
        this._title = name;
        this._image = link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();
        this._likes = likes;
        this._owner = owner._id;
        this._userId = userId;
        this._likesCounter = this._element.querySelector('.elements__counter');
        this._openPopupDelete = handleCardDelete;
        this._toggleLike = handleCardLike;
        this._id = _id;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector(".elements__card").cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector(".elements__like-button").addEventListener("click", (event) => {
            this._likeButtonClick();
        });

        this._element.querySelector(".elements__delete-button").addEventListener("click", (event) => {
            this._deleteBtnClick();
        });

        this._element.querySelector(".elements__card-image").addEventListener("click", () => this._handleCardClick(this._image, this._title));
    }

    _likeButtonClick() {
        this._toggleLike(this._element);
    }


    _deleteBtnClick() {
        this._openPopupDelete(this._element);
    }

    generateCard() {
        this._setEventListeners();
        this._likesCounter.textContent = this._likes.length;
        if (this._userId === this._owner) {
            this._element.querySelector('.elements__delete-button').classList.add('elements__delete-button_active');
        }
        this._likes.forEach(like => {
            if (like._id === this._userId) {
                this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
            }
        })
        this._element.id = this._id;
        this._element.querySelector(".elements__title").textContent = this._title;
        this._element.querySelector(".elements__card-image").alt = this._title;
        this._element.querySelector(".elements__card-image").src = this._image;
        return this._element;
    }

    removeLike(card, result) {
        this._element.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
        this._element.querySelector('.elements__counter').textContent = result.likes.length;
    }

    addLike(card, result) {
        this._element.querySelector('.elements__like-button').classList.add('elements__like-button_active');
        this._element.querySelector('.elements__counter').textContent = result.likes.length;
    }

    delCard(card) {
        this._element.remove();
    }

}