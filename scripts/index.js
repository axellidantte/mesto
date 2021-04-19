const popupProfile = document.querySelector(".pop-up_profile");
const popupCards = document.querySelector(".pop-up_cards");
const popupEditCloseButton = document.querySelector(".pop-up__exit-button_edit");
const popupAddCloseButton = document.querySelector(".pop-up__exit-button_add");
const popupEditSaveButton = document.querySelector(".pop-up__profile__button");
const popupAddSaveButton = document.getElementById("pop-up_cards__button");
const editButton = document.querySelector(".profile__edit-button");
const elementsCards = document.querySelector(".elements__cards");
const addButton = document.querySelector(".profile__add-button");
const cardsTemplate = document.querySelector(".cards-template").content;
const popupForm = document.querySelector(".pop-up__form");
const container = document.querySelector(".elements__cards");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const titleFieldEdit = document.getElementById("input-profile-title");
const subtitleFieldEdit = document.getElementById("input-profile-subtitle");
const titleFieldAdd = document.getElementById("popup-add-title");
const linkFieldAdd = document.getElementById("popup-add-link");
const formAdd = document.querySelector(".pop-up__form_add");
const popupImg = document.querySelector(".pop-up-img");
const imgInPopupImg = document.querySelector(".pop-up-img__big-img");
const titlePopupImg = document.querySelector(".pop-up-img__title");
const popupImgClose = document.querySelector(".pop-up-img__close");
renderCards();
editButton.addEventListener("click", openPopupEdit);
popupForm.addEventListener("submit", submitEditForm);

addButton.addEventListener("click", function () {
  openPopup(popupCards);
});


popupEditCloseButton.addEventListener("click", function () {
  closePopup(popupProfile);
});

popupAddCloseButton.addEventListener("click", function () {
  closePopup(popupCards);
});

popupImgClose.addEventListener("click", function () {
  closePopup(popupImg);
});

formAdd.addEventListener("submit", submitAddForm);


closeOver();
function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".pop-up_opened")
    closePopup(openedPopup)
  }
  if (event.key === " ") {
    event.preventDefault()
  }
}
function openPopup(popup) {
  popup.classList.add("pop-up_opened")
  document.addEventListener("keydown", closeByEscape)
}
function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", closeByEscape);
}

function closeOver(event) {
  const popups = document.querySelectorAll(".pop-up")
  popups.forEach((popup) => {
    popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("pop-up_opened")) {
       closePopup(popup)
     }
    })
  })
}

function openImg(evt) {
  const textThisImg = evt.target.parentNode.querySelector(".elements__title").textContent;
  titlePopupImg.textContent = textThisImg;
  imgInPopupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  openPopup(popupImg);
}

function openPopupEdit(evt) {
  titleFieldEdit.value = profileTitle.textContent;
  subtitleFieldEdit.value = profileSubtitle.textContent;
  popupEditSaveButton.classList.remove("pop-up__button_disabled")
  popupEditSaveButton.removeAttribute("disabled")
  openPopup(popupProfile);
}

function createCardsDomNode(item) {
  const newItem = cardsTemplate.cloneNode(true);
  const cardsTitle = newItem.querySelector(".elements__title");
  const cardsImage = newItem.querySelector(".elements__card-image");
  cardsTitle.textContent = item.name;
  cardsImage.src = item.link;
  cardsImage.alt = item.name;
  const buttonLike = newItem.querySelector(".elements__like-button");
  buttonLike.addEventListener("click", createLike);
  const buttonDelete = newItem.querySelector(".elements__delete-button");
  buttonDelete.addEventListener("click", deleteLike);
  cardsImage.addEventListener("click", openImg);
  return newItem;
}

function createLike(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

function deleteLike(evt) {
  const currentCard = evt.target.closest(".elements__card");
  currentCard.remove();
}

function renderCards() {
  const newCards = initialCards.map(createCardsDomNode);
  container.append(...newCards);
}

function submitEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleFieldEdit.value;
  profileSubtitle.textContent = subtitleFieldEdit.value;
  closePopup(popupProfile);
}

function submitAddForm(evt) {
  evt.preventDefault();
  const addCard = createCardsDomNode({ name: titleFieldAdd.value, link: linkFieldAdd.value });
  container.prepend(addCard);
  closePopup(popupCards);
  popupAddSaveButton.classList.add("pop-up__button_disabled");
  popupAddSaveButton.setAttribute("disabled", true);
  formAdd.reset();
}