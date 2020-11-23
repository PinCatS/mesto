/* Handlers definition and helper functions */
function populateInputWithCurrentValues() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;
}

function closePopup() {
  popupNode.classList.remove('popup_opened');
}

function openPopup() {
    popupNode.classList.add('popup_opened');
    populateInputWithCurrentValues();
}

function savePopupInput(evt) {
  evt.preventDefault();

  profileNameNode.textContent = profileNameInput.value;
  profileActivityNode.textContent = profileActivityInput.value;

  closePopup();
}

/* Getting form, profile info and buttons */
let popupNode = document.querySelector('.popup');
let popupForm = popupNode.querySelector('.popup__container');
let profileInfoTextNode = document.querySelector('.profile__info-text');

let popupCloseButton = popupNode.querySelector('.popup__close-button');
let profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

/* Getting nodes with profile name and activity */
let profileNameNode = profileInfoTextNode.querySelector('.profile__name');
let profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

/* Getting form name and activity inputs */
let profileNameInput = popupNode.querySelector('.popup__input_name_name');
let profileActivityInput = popupNode.querySelector('.popup__input_name_activity');

/* Add event listeners */
popupForm.addEventListener('submit', savePopupInput);
popupCloseButton.addEventListener('click', closePopup);
profileInfoEditButton.addEventListener('click', openPopup);

