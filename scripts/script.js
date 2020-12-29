import { initialCards } from './initial-cards.js';
import { formConfig } from './forms-config.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

/* Edit profile form variables */
const editProfilePopup = document.querySelector('.popup_name_edit-profile');

const popupEditPorfileForm = editProfilePopup.querySelector('.popup__container');
const profileInfoTextNode = document.querySelector('.profile__info-text');
const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

const profileNameInput = popupEditPorfileForm.querySelector('.popup__input_name_name');
const profileActivityInput = popupEditPorfileForm.querySelector('.popup__input_name_activity');

/* Add new card form variables */
const addNewCardPopup = document.querySelector('.popup_name_add-card');
const addCardForm = addNewCardPopup.querySelector('.popup__container');
const addCardButton = document.querySelector('.profile__add-button');

const cardsListNode = document.querySelector('.places > .cards');
const addCardNameInput = addCardForm.querySelector('.popup__input_name_place-name');
const paddCardLinkInput = addCardForm.querySelector('.popup__input_name_place-image-url');

/* Image popup variables */
const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.image-popup__image');
const popupFigureImageCaption = imagePopup.querySelector('.image-popup__caption')

/* Enables forms validation */
const editProfileFormValidator = new FormValidator(popupEditPorfileForm, formConfig);
const addCardFormValidator = new FormValidator(addCardForm, formConfig);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


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

function findOpenedPopup() {
  return document.querySelector('.popup_opened');
}

function populateProfileFormInputsWithCurrentValues() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;

  editProfileFormValidator.notifyFormsAboutInputChange();
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

function setKeyupListener(handler) {
  document.addEventListener('keyup', handler);
}

function removeKeyupListener(handler) {
  document.removeEventListener('keyup', handler);
}

function handleCardClick(evt) {
  const imageNode = evt.target;
  const imageLink = imageNode.src;
  const card = getParentCard(imageNode);
  const cardTitle = card.querySelector('.card__title').textContent;

  setKeyupListener(handlePopupCloseAction);
  openPopup(imagePopup);
  fillImagePopup(cardTitle, imageLink);
}

function buildCard(cardData) {
  const card = new Card(cardData, '#card', handleCardClick);
  return card.generateCard();
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

function isPopupCloseAction(evt) {
  return (
    evt.target.classList.contains('popup__close-button') ||
    evt.target.classList.contains('popup') ||
    (evt.code == 'Escape')
   );
}

function doCleanUpAndClosePopup(popupElement) {
  removeKeyupListener(handlePopupCloseAction);
  closePopup(popupElement);
  if (hasForm(popupElement)) {
    const formElement = getPopupForm(popupElement);
    clearFormInputs(formElement);
  }
}

function handlePopupCloseAction(evt) {
  if (!isPopupCloseAction(evt)) return;

  const openedPopup = findOpenedPopup();
  if (openedPopup != null) {
    doCleanUpAndClosePopup(openedPopup);
  }
}

function handlePopupOpenButtonClick(evt) {
  const buttonName = getTargetButtonName(evt.target);

  setKeyupListener(handlePopupCloseAction);

  switch(buttonName) {
    case 'profile-edit-button':
      openPopup(editProfilePopup);
      populateProfileFormInputsWithCurrentValues();
      break;
    case 'profile-add-button':
      openPopup(addNewCardPopup);
      addCardFormValidator.resetFormValidityState();
  }
}

function handlePopupSaveButtonClick(evt) {
  evt.preventDefault();

  const formElement = evt.currentTarget;

  switch (formElement.name) {
    case 'profile-edit-form':
      saveEditProfileInputValuesToPage();
      doCleanUpAndClosePopup(editProfilePopup);
      break;
    case 'add-card-form':
      addNewCardFromInput();
      doCleanUpAndClosePopup(addNewCardPopup);
      break;
  }
}


/* Add event listeners  and call functions */
editProfilePopup.addEventListener('click', handlePopupCloseAction);
popupEditPorfileForm.addEventListener('submit', handlePopupSaveButtonClick);
profileInfoEditButton.addEventListener('click', handlePopupOpenButtonClick);

addNewCardPopup.addEventListener('click', handlePopupCloseAction);
addCardForm.addEventListener('submit', handlePopupSaveButtonClick);
addCardButton.addEventListener('click', handlePopupOpenButtonClick);

imagePopup.addEventListener('click', handlePopupCloseAction);


fillPageWithInitialPlaceCards(initialCards);
