/* Getting form, profile info and buttons */
const profileEditFormPopup = document.querySelector('.popup_name_edit-profile');
const popupForm = profileEditFormPopup.querySelector('.popup__container');
const profileInfoTextNode = document.querySelector('.profile__info-text');

const popupCloseButton = popupForm.querySelector('.popup__close-button');
const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

const handleAddNewCardButtonClickPopup = document.querySelector('.popup_name_add-card');
const addCardForm = handleAddNewCardButtonClickPopup.querySelector('.popup__container');
const addCardCloseButton = addCardForm.querySelector('.popup__close-button');
const addCardButton = document.querySelector('.profile__add-button');

/* Getting nodes with profile name and activity */
const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

/* Getting form name and activity inputs */
const profileNameInput = popupForm.querySelector('.popup__input_name_name');
const profileActivityInput = popupForm.querySelector('.popup__input_name_activity');

/* Getting add-card-form name and link nodes */
const cardsListNode = document.querySelector('.places > .cards');
const addCardNameInput = addCardForm.querySelector('.popup__input_name_place-name');
const paddCardLinkInput = addCardForm.querySelector('.popup__input_name_place-image-url');

/* Getting image popup info */
const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.image-popup__image');
const popupFigureImageCaption = imagePopup.querySelector('.image-popup__caption')
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

fillPageWithInitialPlaceCards(initialCards);


/* Handlers definition and helper functions */

function handlePopupCloseButtonClick(evt) {
  const formName = getFormNameOfTargetButton(evt.target);

  switch(formName) {
    case 'profile-edit-form':
      closePopup(profileEditFormPopup);
      break;
    case 'add-card-form':
      closePopup(handleAddNewCardButtonClickPopup);
  }
}

function getFormNameOfTargetButton(button) {
  return button.closest('.popup__container').name;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function handlePopupOpenButtonClick(evt) {
    const buttonName = getTargetButtonName(evt.target);

    switch(buttonName) {
      case 'profile-edit-button':
        openPopup(profileEditFormPopup);
        populateProfileFormInputsWithCurrentValues();
        break;
      case 'profile-add-button':
        openPopup(handleAddNewCardButtonClickPopup);
    }
}

function getTargetButtonName(button) {
  return button.name;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function populateProfileFormInputsWithCurrentValues() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;
}

function handlePopupSaveButtonClick(evt) {
  evt.preventDefault();
  saveEditProfileInputValuesToPage();
  handlePopupCloseButtonClick(evt);
}

function saveEditProfileInputValuesToPage() {
  profileNameNode.textContent = profileNameInput.value;
  profileActivityNode.textContent = profileActivityInput.value;
}

function handleAddNewCardButtonClick(evt) {
  evt.preventDefault();
  addNewCardFromFromInput();
  handlePopupCloseButtonClick(evt);
}

function addNewCardFromFromInput() {
  const cardFragment = buildCard({
    name: addCardNameInput.value,
    link: paddCardLinkInput.value
  });

  cardsListNode.prepend(cardFragment);
}

function fillPageWithInitialPlaceCards(cards) {
  const cardNodes = cards.map(buildCard);
  cardsListNode.append(...cardNodes);
}

function buildCard({ name, link }) {
  const cardTemplate = document.querySelector('#card').content;
  const cardFragment = cardTemplate.cloneNode(true);

  const cardImage = cardFragment.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;

  cardFragment.querySelector('.card__title').textContent = name;

  cardImage.addEventListener('click', handleCardImageClick);
  cardFragment.querySelector('.card__like-button').addEventListener('click', handleLikeButtonClick);
  cardFragment.querySelector('.card__remove-button').addEventListener('click', removeCard);

  return cardFragment;
}

function handleCardImageClick(evt) {
  const imageNode = evt.target;
  const imageLink = imageNode.src;
  const card = getParentCard(imageNode);
  const cardTitle = card.querySelector('.card__title').textContent;

  openPopup(imagePopup);
  fillImagePopup(cardTitle, imageLink);
}

function fillImagePopup(cardTitle, imageLink) {
  popupImage.src = imageLink;
  popupImage.alt = cardTitle;
  popupFigureImageCaption.textContent = cardTitle;
}

function getParentCard(node) {
  return node.closest('.card');
}

function handleImagePopupCloseButtonClick(evt) {
  closePopup(imagePopup);
}

function handleLikeButtonClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_active');
}

function removeCard(evt) {
  const trashButtonNode = evt.target;
  const card = getParentCard(trashButtonNode);
  card.remove();
}


/* Add event listeners */
popupForm.addEventListener('submit', handlePopupSaveButtonClick);
popupCloseButton.addEventListener('click', handlePopupCloseButtonClick);
profileInfoEditButton.addEventListener('click', handlePopupOpenButtonClick);

addCardForm.addEventListener('submit', handleAddNewCardButtonClick);
addCardCloseButton.addEventListener('click', handlePopupCloseButtonClick);
addCardButton.addEventListener('click', handlePopupOpenButtonClick);

imagePopupCloseButton.addEventListener('click', handleImagePopupCloseButtonClick);
