const validationConfig = {
    formSelector: ".pop-up__form",
    inputSelector: ".pop-up__input",
    submitButtonSelector: ".pop-up__button",
    inactiveButtonClass: "pop-up__button_disabled",
    inputErrorClass: "pop-up__input_type_error",
    errorClass: "pop-up__error_visible",
    errorMessageInput: "Вы пропустили это поле.",
    errorMessageUrl: "Введите адрес сайта."
}

const popupProfile = document.querySelector(".pop-up_profile");
const popupCards = document.querySelector(".pop-up_cards");
const popupEditCloseButton = document.querySelector(".pop-up__exit-button_edit");
const popupAddCloseButton = document.querySelector(".pop-up__exit-button_add");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const container = document.querySelector(".elements__cards");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const titleFieldEdit = document.getElementById("input-profile-title");
const subtitleFieldEdit = document.getElementById("input-profile-subtitle");
const titleFieldAdd = document.getElementById("popup-add-title");
const linkFieldAdd = document.getElementById("popup-add-link");
const formAdd = document.querySelector(".pop-up__form_add");
const formEdit = document.querySelector(".pop-up__form_edit");
const popupImg = document.querySelector(".pop-up-img");
const imgInPopupImg = document.querySelector(".pop-up-img__big-img");
const titlePopupImg = document.querySelector(".pop-up-img__title");
const popupImgClose = document.querySelector(".pop-up-img__close");
const popups = document.querySelectorAll(".pop-up");
const cardsTemplate = "#cards-template";

export {
    validationConfig,
    popupProfile,
    popupCards,
    popupEditCloseButton,
    popupAddCloseButton,
    editButton,
    addButton,
    container,
    profileTitle,
    profileSubtitle,
    titleFieldEdit,
    subtitleFieldEdit,
    titleFieldAdd,
    linkFieldAdd,
    popupImg,
    imgInPopupImg,
    titlePopupImg,
    popupImgClose,
    popups,
    cardsTemplate,
    formAdd,
    formEdit
}