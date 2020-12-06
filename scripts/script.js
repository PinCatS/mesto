/* Edit profile form variables */
const editProfilePopup = document.querySelector('.popup_name_edit-profile');

const popupEditPorfileForm = editProfilePopup.querySelector('.popup__container');
const profileInfoTextNode = document.querySelector('.profile__info-text');
const editProfilePopupCloseButton = popupEditPorfileForm.querySelector('.popup__close-button');
const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

const profileNameInput = popupEditPorfileForm.querySelector('.popup__input_name_name');
const profileActivityInput = popupEditPorfileForm.querySelector('.popup__input_name_activity');

/* Add new card form variables */
const handleAddNewCardButtonClickPopup = document.querySelector('.popup_name_add-card');
const addCardForm = handleAddNewCardButtonClickPopup.querySelector('.popup__container');
const addCardCloseButton = addCardForm.querySelector('.popup__close-button');
const addCardButton = document.querySelector('.profile__add-button');

const cardsListNode = document.querySelector('.places > .cards');
const addCardNameInput = addCardForm.querySelector('.popup__input_name_place-name');
const paddCardLinkInput = addCardForm.querySelector('.popup__input_name_place-image-url');

/* Image popup variables */
const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.image-popup__image');
const popupFigureImageCaption = imagePopup.querySelector('.image-popup__caption')
const imagePopupCloseButton = imagePopup.querySelector('.popup__close-button');


/* Handlers definition and helper functions */

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

function getParentCard(node) {
  return node.closest('.card');
}

function getFormNameOfTargetButton(button) {
  return button.closest('.popup__container').name;
}

function getTargetButtonName(button) {
  return button.name;
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function addNewCardFromFromInput() {
  const cardFragment = buildCard({
    name: addCardNameInput.value,
    link: paddCardLinkInput.value
  });

  cardsListNode.prepend(cardFragment);
}

function clearAddNewCardInputs() {
  addCardNameInput.value = '';
  paddCardLinkInput.value = '';
}

function populateProfileFormInputsWithCurrentValues() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;
}

function saveEditProfileInputValuesToPage() {
  profileNameNode.textContent = profileNameInput.value;
  profileActivityNode.textContent = profileActivityInput.value;
}

function fillImagePopup(cardTitle, imageLink) {
  popupImage.src = imageLink;
  popupImage.alt = cardTitle;
  popupFigureImageCaption.textContent = cardTitle;
}

function removeCard(evt) {
  const trashButtonNode = evt.target;
  const card = getParentCard(trashButtonNode);
  card.remove();
}

function fillPageWithInitialPlaceCards(cards) {
  const cardNodes = cards.map(buildCard);
  cardsListNode.append(...cardNodes);
}

function handleImagePopupCloseButtonClick(evt) {
  closePopup(imagePopup);
}

function handleLikeButtonClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_active');
}

function handlePopupOpenButtonClick(evt) {
  const buttonName = getTargetButtonName(evt.target);

  switch(buttonName) {
    case 'profile-edit-button':
      openPopup(editProfilePopup);
      populateProfileFormInputsWithCurrentValues();
      break;
    case 'profile-add-button':
      openPopup(handleAddNewCardButtonClickPopup);
  }
}

function handlePopupCloseButtonClick(evt) {
  const formName = getFormNameOfTargetButton(evt.target);

  switch(formName) {
    case 'profile-edit-form':
      closePopup(editProfilePopup);
      break;
    case 'add-card-form':
      closePopup(handleAddNewCardButtonClickPopup);
  }
}

function handlePopupSaveButtonClick(evt) {
  evt.preventDefault();
  saveEditProfileInputValuesToPage();
  handlePopupCloseButtonClick(evt);
}

function handleAddNewCardButtonClick(evt) {
  evt.preventDefault();
  addNewCardFromFromInput();
  clearAddNewCardInputs();
  handlePopupCloseButtonClick(evt);
}

function handleCardImageClick(evt) {
  const imageNode = evt.target;
  const imageLink = imageNode.src;
  const card = getParentCard(imageNode);
  const cardTitle = card.querySelector('.card__title').textContent;

  openPopup(imagePopup);
  fillImagePopup(cardTitle, imageLink);
}


/* Add event listeners  and call functions */
popupEditPorfileForm.addEventListener('submit', handlePopupSaveButtonClick);
editProfilePopupCloseButton.addEventListener('click', handlePopupCloseButtonClick);
profileInfoEditButton.addEventListener('click', handlePopupOpenButtonClick);

addCardForm.addEventListener('submit', handleAddNewCardButtonClick);
addCardCloseButton.addEventListener('click', handlePopupCloseButtonClick);
addCardButton.addEventListener('click', handlePopupOpenButtonClick);

imagePopupCloseButton.addEventListener('click', handleImagePopupCloseButtonClick);


fillPageWithInitialPlaceCards(initialCards);
