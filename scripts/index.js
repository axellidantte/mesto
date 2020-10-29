let popup = document.querySelector('.pop-up');
let editButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.pop-up__exit-button');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let form = document.querySelector('.pop-up__form');
let titleField = document.querySelector('.pop-up__input_type_title');
let subtitleField = document.querySelector('.pop-up__input_type_subtitle');

function showPopup() {
    popup.classList.add('pop-up_opened'); 
    titleField.value = profileTitle.textContent;
    subtitleField.value = profileSubtitle.textContent ;
}

function closePopup() {
    popup.classList.remove('pop-up_opened');
}

function submitForm(event) {
    event.preventDefault();
    profileTitle.textContent = titleField.value;
    profileSubtitle.textContent = subtitleField.value;
}

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', submitForm);