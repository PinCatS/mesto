/* Handlers definition and helper functions */

function openPopup(evt) {
  const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

  if (evt.target === profileInfoEditButton) {
    popupNode.classList.add('popup_opened');
    populateInputWithCurrentValues(this);
  }
}

function populateInputWithCurrentValues(profileInfoTextNode) {
  const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
  const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');
  const [profileNameInput, profileActivityInput] = popupNode.querySelectorAll('.popup__input');

  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;
}

function savePopupInput(evt) {
  const [profileNameInput, profileActivityInput] = popupNode.querySelectorAll('.popup__input');
  const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
  const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

  profileNameNode.textContent = profileNameInput.value;
  profileActivityNode.textContent = profileActivityInput.value;

  closePopup(evt);
}

function closePopup(evt) {
  popupNode.classList.remove('popup_opened');
  evt.preventDefault();
}

/* Main logic */

const popupNode = document.querySelector('.popup');
const popupForm = popupNode.querySelector('.popup__container');
const popupCloseButton = popupNode.querySelector('.popup__close-button');

popupForm.addEventListener('submit', savePopupInput);
popupCloseButton.addEventListener('click', closePopup);


const profileInfoTextNode = document.querySelector('.profile__info-text');
profileInfoTextNode.addEventListener('click', openPopup);

