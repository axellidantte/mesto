import { initialCards } from "./initial-сards.js"
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";

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

const formEditValidator = new FormValidator(validationConfig, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAdd);
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

function closePopupsByOverlay(event) {
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
  const card = createCard({ name: titleFieldAdd.value, link: linkFieldAdd.value });

  container.prepend(card);
  closePopup(popupCards);
  formAdd.reset();
}

function createCard(item) {
  const card = new Card(item, cardsTemplate, handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
}

function renderInitialCards() {
  const newCards = initialCards.map(createCard);
  container.append(...newCards);
}

renderInitialCards();

function handleCardClick(link, name) {
  openPopup(popupImg);

  imgInPopupImg.src = link;
  imgInPopupImg.alt = name;
  titlePopupImg.textContent = name;
}

formAdd.addEventListener("submit", submitAddForm);
editButton.addEventListener("click", openPopupEdit);
addButton.addEventListener("click", openPopupAdd);
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

closePopupsByOverlay();