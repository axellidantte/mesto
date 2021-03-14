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
const popupProfile = document.querySelector(".pop-up_profile");
const popupCards = document.querySelector('.pop-up_cards');
const popupEditCloseButton = document.querySelector(".pop-up__exit-button_edit");
const popupAddCloseButton = document.querySelector('.pop-up__exit-button_add');
const editButton = document.querySelector(".profile__edit-button");
const elementsCards = document.querySelector(".elements__cards");
const addButton = document.querySelector(".profile__add-button");
const cardsTemplate = document.querySelector('.cards-template').content;
const popupForm = document.querySelector('.pop-up__form');
const container = document.querySelector('.elements__cards');
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const titleFieldEdit = document.querySelector(".pop-up__input_edit-title");
const subtitleFieldEdit = document.querySelector(".pop-up__input_edit-subtitle");
const titleFieldAdd = document.querySelector('.pop-up__input_add-title');
const linkFieldAdd = document.querySelector('.pop-up__input_add-link');
const formAdd = document.querySelector('.pop-up__form_add');
const popupImg = document.querySelector('.pop-up-img');
const imgInPopupImg = document.querySelector('.pop-up-img__big-img');
const titlePopupImg = document.querySelector('.pop-up-img__title');
const popupImgClose = document.querySelector('.pop-up-img__close');
function togglePopup(popup) {
  popup.classList.toggle('pop-up_opened')
}

addButton.addEventListener('click', function() {
  togglePopup(popupCards);
  });

function popupEdit(evt) {
  titleFieldEdit.value = profileTitle.textContent;
  subtitleFieldEdit.value = profileSubtitle.textContent;
  togglePopup(popupProfile);
}

function openImg(evt) {
  const textThisImg = evt.target.parentNode.querySelector('.elements__title').textContent;
  titlePopupImg.textContent = textThisImg;
  imgInPopupImg.src = evt.target.src;
  popupImg.alt = evt.target.alt;
  togglePopup(popupImg);
}

editButton.addEventListener('click', popupEdit);

function createCardsDomNode(item) {
  const newItem = cardsTemplate.cloneNode(true);
  const cardsTitle = newItem.querySelector('.elements__title');
  const cardsImage = newItem.querySelector('.elements__card-image');
  cardsTitle.textContent = item.name;
  cardsImage.src = item.link;
  cardsImage.alt = item.name;
  const buttonLike = newItem.querySelector('.elements__like-button');
  buttonLike.addEventListener('click', function(evt){
    evt.target.classList.toggle('elements__like-button_active');
  });
  const buttonDelete = newItem.querySelector('.elements__delete-button');
    buttonDelete.addEventListener('click', function(evt) {
    const currentCard = evt.target.closest('.elements__card');
    currentCard.remove();
  });
  const img = newItem.querySelector('.elements__card-image');
  img.addEventListener('click', openImg);
  return newItem;
}

popupEditCloseButton.addEventListener("click", function() {
  togglePopup(popupProfile);
});

popupAddCloseButton.addEventListener('click', function() {
  togglePopup(popupCards);
});

function submitEditForm(evt) {
  evt.preventDefault();
  profileTitle.textContent = titleFieldEdit.value;
  profileSubtitle.textContent = subtitleFieldEdit.value;
  togglePopup(popupProfile);
}

popupForm.addEventListener('submit', submitEditForm);

function submitAddForm(evt) {
  evt.preventDefault();
  let addCard = createCardsDomNode({name:titleFieldAdd.value, link:linkFieldAdd.value});
  container.prepend(addCard);
  popupCards.classList.toggle('pop-up_opened');
  titleFieldAdd.value = '';
  linkFieldAdd.value = '';
}

formAdd.addEventListener('submit', submitAddForm);

function renderCards() {
  const newCards = initialCards.map(createCardsDomNode);
  container.append(...newCards);
}

popupImgClose.addEventListener('click', function() {
  togglePopup(popupImg);
});

renderCards();

