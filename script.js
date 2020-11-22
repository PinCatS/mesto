/* Handlers definition and helper functions */

function openPopup(evt) {
  if (evt.target === profileInfoEditButton) {
    popupNode.classList.add('popup_opened');

    const profileNameNode = this.querySelector('.profile__name');
    const profileActivityNode = this.querySelector('.profile__activity');
    const [profileNameInput, profileActivityInput] = popupNode.querySelectorAll('.form-input');

    profileNameInput.value = profileNameNode.textContent;
    profileActivityInput.value = profileActivityNode.textContent;
  }
}

function savePopupInput(evt) {
  const [profileNameInput, profileActivityInput] = popupNode.querySelectorAll('.form-input');
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
const popupSaveButton = popupNode.querySelector('.popup__save-button');
const popupCloseButton = popupNode.querySelector('.popup__close-button');

const profileInfoTextNode = document.querySelector('.profile__info-text');
const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

profileInfoTextNode.addEventListener('click', openPopup);
popupSaveButton.addEventListener('click', savePopupInput);
popupCloseButton.addEventListener('click', closePopup);
