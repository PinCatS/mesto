'use strict';

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
const addNewCardPopup = document.querySelector('.popup_name_add-card');
const addCardForm = addNewCardPopup.querySelector('.popup__container');
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

const {
  resetFormValidityState,
  notifyFromsAboutInputChange
} = enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
});

/* Handlers definition and helper functions */

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function getParentCard(node) {
  return node.closest('.card');
}

function hasForm(popup) {
  return popup.querySelector('.popup__form') != null;
}

function getPopupForm(popup) {
  return popup.querySelector('.popup__form');
}

function clearFormInputs(formElement) {
  formElement.reset();
}

function populateProfileFormInputsWithCurrentValues() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;

  notifyFromsAboutInputChange(profileNameInput, profileActivityInput);
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

function getTargetButtonName(button) {
  return button.name;
}

function removeCard(evt) {
  const trashButtonNode = evt.target;
  const card = getParentCard(trashButtonNode);
  card.remove();
}

function handleLikeButtonClick(evt) {
  const likeButton = evt.target;
  likeButton.classList.toggle('card__like-button_active');
}

function setKeyupListener(handler) {
  document.addEventListener('keyup', handler);
}

function removeKeyupListener(handler) {
  document.removeEventListener('keyup', handler);
}

function handleCardImageClick(evt) {
  const imageNode = evt.target;
  const imageLink = imageNode.src;
  const card = getParentCard(imageNode);
  const cardTitle = card.querySelector('.card__title').textContent;

  setKeyupListener(handlePopupCloseAction);
  openPopup(imagePopup);
  fillImagePopup(cardTitle, imageLink);
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

function addNewCardFromInput() {
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

function handleImagePopupCloseButtonClick(evt) {
  removeKeyupListener(handlePopupCloseAction);
  closePopup(imagePopup);
}

function isPopupCloseAction(evt) {
  return (
    evt.target.classList.contains('popup__close-button') ||
    evt.target.classList.contains('popup') ||
    (evt.code == 'Escape')
   );
}

function handlePopupCloseAction(evt) {
  if (!isPopupCloseAction(evt)) return;

  const openedPopup = document.querySelector('.popup_opened');

  if (openedPopup != null) {
    removeKeyupListener(handlePopupCloseAction);
    closePopup(openedPopup);
    if (hasForm(openedPopup)) {
      const formElement = getPopupForm(openedPopup);
      clearFormInputs(formElement);
      resetFormValidityState(formElement);
    }
  }
}

function handlePopupOpenButtonClick(evt) {
  const buttonName = getTargetButtonName(evt.target);

  switch(buttonName) {
    case 'profile-edit-button':
      setKeyupListener(handlePopupCloseAction);
      openPopup(editProfilePopup);
      populateProfileFormInputsWithCurrentValues();
      break;
    case 'profile-add-button':
      setKeyupListener(handlePopupCloseAction);
      openPopup(addNewCardPopup);
  }
}

function handlePopupSaveButtonClick(evt) {
  evt.preventDefault();
  saveEditProfileInputValuesToPage();
  clearFormInputs(popupEditPorfileForm);
  resetFormValidityState(popupEditPorfileForm);
  closePopup(editProfilePopup);
}

function handleAddNewCardButtonClick(evt) {
  evt.preventDefault();
  addNewCardFromInput();
  clearFormInputs(addCardForm);
  resetFormValidityState(addCardForm);
  closePopup(addNewCardPopup);
}


/* Add event listeners  and call functions */

editProfilePopup.addEventListener('click', handlePopupCloseAction);
popupEditPorfileForm.addEventListener('submit', handlePopupSaveButtonClick);
profileInfoEditButton.addEventListener('click', handlePopupOpenButtonClick);

addNewCardPopup.addEventListener('click', handlePopupCloseAction);
addCardForm.addEventListener('submit', handleAddNewCardButtonClick);
addCardButton.addEventListener('click', handlePopupOpenButtonClick);

imagePopup.addEventListener('click', handlePopupCloseAction);


fillPageWithInitialPlaceCards(initialCards);
