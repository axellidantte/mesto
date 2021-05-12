import { formValidator } from "./FormValidator.js";
import { Card } from "./Card.js";


const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];

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
// const popupEditSaveButton = document.querySelector(".pop-up__button_profile");
// const popupAddSaveButton = document.getElementById("pop-up_cards__button");
const editButton = document.querySelector(".profile__edit-button");
// const elementsCards = document.querySelector(".elements__cards");
const addButton = document.querySelector(".profile__add-button");
// const cardsTemplate = document.querySelector(".cards-template").content;
// const popupForm = document.querySelector(".pop-up__form");
const container = document.querySelector(".elements__cards");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const titleFieldEdit = document.getElementById("input-profile-title");
const subtitleFieldEdit = document.getElementById("input-profile-subtitle");
const titleFieldAdd = document.getElementById("popup-add-title");
const linkFieldAdd = document.getElementById("popup-add-link");
const formAdd = document.querySelector(".pop-up__form_add");
const formEdit = document.querySelector('.pop-up__form_edit');
const popupImg = document.querySelector(".pop-up-img");
const imgInPopupImg = document.querySelector(".pop-up-img__big-img");
const titlePopupImg = document.querySelector(".pop-up-img__title");
const popupImgClose = document.querySelector(".pop-up-img__close");
const popups = document.querySelectorAll(".pop-up");

const formEditValidator = new formValidator(validationConfig, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new formValidator(validationConfig, formAdd);
formAddValidator.enableValidation();


function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keydown", closeByEscape);
}

function openPopupEdit(evt) {
  titleFieldEdit.value = profileTitle.textContent;
  subtitleFieldEdit.value = profileSubtitle.textContent;
  formEditValidator.refreshValidationInput();
  openPopup(popupProfile);
}

function openPopupAdd() {
  formAddValidator.refreshValidationInput();
  formAdd.reset();
  openPopup(popupCards);
}

function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".pop-up_opened")
    closePopup(openedPopup)
  }
  if (event.key === " ") {
    event.preventDefault()
  }
}

function closeOver(event) {
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("pop-up_opened")) {
        closePopup(popup)
      }
    })
  })
}

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function submitEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleFieldEdit.value;
  profileSubtitle.textContent = subtitleFieldEdit.value;
  closePopup(popupProfile);
}

function submitAddForm(evt) {
  evt.preventDefault();
  const addCard = createCard({ name: titleFieldAdd.value, link: linkFieldAdd.value });

  container.prepend(addCard);
  closePopup(popupCards);
  formAdd.reset();
}

function createCard(item) {
  const card = new Card(item, "#cards-template", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function renderCards() {
  const newCards = initialCards.map(createCard);
  container.append(...newCards);
}

renderCards();

function handleCardClick(link, name) {
  openPopup(popupImg);

  imgInPopupImg.src = link;
  imgInPopupImg.alt = name;
  titlePopupImg.textContent = name;
}

formAdd.addEventListener("submit", submitAddForm);
editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener('click', openPopupAdd);
popupAddCloseButton.addEventListener("click", function () {
  closePopup(popupCards);
});
popupImgClose.addEventListener("click", function () {
  closePopup(popupImg);
});
popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});
formEdit.addEventListener("submit", submitEditForm);

closeOver();