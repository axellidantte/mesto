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
  cardsButton,
  profileButton,
  popupAvatarButton,
  formAvatar,
  profileAvatarButton,
  popupDelete,
  popupAvatar,
  profileImage,
  popupButtonAdd
} from "../utils/consts.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupWithDelete } from "../components/PopupWithDelete.js"

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
  headers: {
    authorization: 'bcdeaa4a-1352-4fe5-8413-f3ec292b6c5c',
    'Content-Type': 'application/json'
  }
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([profileInfo, cards]) => {
    userInfo.setUserInfo(profileInfo.name, profileInfo.about, profileInfo._id)
    userInfo.setUserAvatar(profileInfo.avatar)
    renderList.renderItems(cards)
  })
  .catch(result => console.log(`${result} err`))

const formEditValidator = new FormValidator(validationConfig, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validationConfig, formAdd);
formAddValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();

const userInfo = new UserInfo(profileTitle, profileSubtitle, profileImage);
const popupImage = new PopupWithImage(popupImg, imgInPopupImg, titlePopupImg);

const popupAddForm = new PopupWithForm(popupCards, {
  submitHandler: (data) => {
    cardsButton.textContent = 'Сохранение...';
    api.addCard(data.place, data.url)
      .then((result) => {
        const element = createCard(result)
        renderList.addNewItem(element);
        popupAddForm.close();
      })
      .catch(result => console.log(`Ошибка при загрузке новой карточки: ${result}`))
      .finally(() => { cardsButton.textContent = 'Сохранить' })

  }
});

const popupEditForm = new PopupWithForm(popupProfile, {
  submitHandler: (data) => {
    profileButton.textContent = "Сохранение...";
    api.editUserInfo(data.name, data.about)
      .then((result) => {
        userInfo.setUserInfo(result.name, result.about)
        popupEditForm.close()
      })
      .catch((result) => {
        console.log(`err: ${result}`);
      })
      .finally(() => {
        profileButton.textContent = 'Сохранить'
      })
  }
});

const popupAva = new PopupWithForm(popupAvatar, {
  submitHandler: (data) => {
    popupAvatarButton.textContent = 'Сохранение...';
    api.newAvatar(data.avatar)
      .then((result) => {
        userInfo.setUserAvatar(result.avatar)
        popupAva.close();
      })
      .catch(result => console.log(`err: ${result}`))
      .finally(() => { popupAvatarButton.textContent = 'Сохранить' })
  }
});

function handleFormSubmitPopupEdit() {
  const getProfileInfo = userInfo.getUserInfo();
  titleFieldEdit.value = getProfileInfo.name;
  subtitleFieldEdit.value = getProfileInfo.about;
  formEditValidator.refreshValidationInput();
  popupEditForm.open();
}

function handleFormSubmitPopupAdd() {
  formAddValidator.refreshValidationInput();
  popupAddForm.open();
}

function handlePopupAvatar() {
  formAvatarValidator.refreshValidationInput();
  popupAva.open();
}

const popupDel = new PopupWithDelete(popupDelete);





function createCard(item) {
  const userId = userInfo.getUserId();
  const card = new Card(item, cardsTemplate, {
    handleCardClick: (link, name) => {
      popupImage.open({ link, name });
    },
    handleCardDelete: (cardId) => {
      popupDel.open(() => {
        api.deleteCard(cardId.id)
          .then(() => {
            card.delCard();
            popupDel.close();
          })
          .catch(result => console.log(`Ошибка при удалении карточки: ${result}`))
      })
    },
    handleCardLike: (cardId) => {
      if (cardId.querySelector('.elements__like-button').classList.contains('elements__like-button_active')) {
        api.handleDeleteLike(cardId.id)
          .then(result => card.removeLike(cardId, result))
          .catch(result => console.log(`Ошибка при снятии лайка: ${result}`))
      }
      else {
        api.handleLikeCard(cardId.id)
          .then(result => card.addLike(cardId, result))
          .catch(result => console.log(`Ошибка при постановке лайка: ${result}`))
      }
    }

  }, userId);
  const cardElement = card.generateCard();

  return cardElement;
}

const renderList = new Section({
  renderer: (item) => {
    const cardElement = createCard(item);
    renderList.addItem(cardElement);
  }
}, '.elements__cards'
);

// renderList.renderItems();
popupImage.setEventListeners();
popupAddForm.setEventListeners();
popupEditForm.setEventListeners();
popupAva.setEventListeners();
popupDel.setEventListeners();

addButton.addEventListener("click", handleFormSubmitPopupAdd);
editButton.addEventListener("click", handleFormSubmitPopupEdit);
profileAvatarButton.addEventListener("click", handlePopupAvatar);