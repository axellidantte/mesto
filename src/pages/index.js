import './index.css';
import {
  validationConfig,
  popupProfile,
  popupCards,
  editButton,
  addButton,
  profileTitle,
  profileSubtitle,
  titleFieldEdit,
  subtitleFieldEdit,
  popupImg,
  imgInPopupImg,
  titlePopupImg,
  cardsTemplate,
  formAdd,
  formEdit,
  container
} from "../utils/consts.js";
import { initialCards } from "../utils/initial-сards.js"
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";


const formEditValidator = new FormValidator(validationConfig, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAdd);
formAddValidator.enableValidation();

const userInfo = new UserInfo(profileTitle, profileSubtitle);
const popupImage = new PopupWithImage(popupImg, imgInPopupImg, titlePopupImg);

const popupAddForm = new PopupWithForm(popupCards, {
  submitHandler: (data) => {
    const element = createCard({
      name: data.place,
      link: data.url
    })
    renderList.addNewItem(element);
    popupAddForm.close();
  }
});

const popupEditForm = new PopupWithForm(popupProfile, {
  submitHandler: (data) => {
    userInfo.setUserInfo(data);
    popupEditForm.close();
  }
});

function handleFormSubmitPopupEdit() {
  const getProfileInfo = userInfo.getUserInfo();
  titleFieldEdit.value = getProfileInfo.name;
  subtitleFieldEdit.value = getProfileInfo.caption;
  formEditValidator.refreshValidationInput();
  popupEditForm.open();
}

function handleFormSubmitPopupAdd() {
  formAddValidator.refreshValidationInput();
  popupAddForm.open();
}

function createCard(item) {
  const card = new Card(item, cardsTemplate, {
    handleCardClick: (link, name) => {
      popupImage.open({ link, name });
    }
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const renderList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item);
    renderList.addItem(cardElement);
  }
}, container
);

renderList.renderItems();
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();

addButton.addEventListener("click", handleFormSubmitPopupAdd);
editButton.addEventListener("click", handleFormSubmitPopupEdit);