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
const cardsButton = document.getElementById("pop-up_cards__button");
const profileButton = document.querySelector('.pop-up__button_profile');
const popupAvatarButton = document.querySelector('.pop-up__button_avatar');
const formAdd = document.querySelector(".pop-up__form_add");
const formEdit = document.querySelector(".pop-up__form_edit");
const formAvatar = document.querySelector(".pop-up__form_type_avatar");
const popupImg = document.querySelector(".pop-up-img");
const imgInPopupImg = document.querySelector(".pop-up-img__big-img");
const titlePopupImg = document.querySelector(".pop-up-img__title");
const popupImgClose = document.querySelector(".pop-up-img__close");
const popups = document.querySelectorAll(".pop-up");
const cardsTemplate = "#cards-template";
const profileAvatarButton = document.querySelector(".profile__avatar-edit-button");
const popupDelete = document.querySelector(".pop-up_delete");
const popupAvatar = document.querySelector(".pop-up_avatar");
const profileImage = document.querySelector(".profile__avatar");
const popupButtonAdd = document.querySelector(".pop-up__button_add")
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
    formEdit,
    formAvatar,
    cardsButton,
    profileButton,
    popupAvatarButton,
    profileAvatarButton,
    popupDelete,
    popupAvatar,
    profileImage,
    popupButtonAdd
}