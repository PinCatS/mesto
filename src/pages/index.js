import '../index.css';
import { initialCards } from '../utils/constants.js';
import { formConfig } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

/* Edit profile form variables */
const editProfilePopup = document.querySelector('.popup_name_edit-profile');

const popupEditPorfileForm = editProfilePopup.querySelector('.popup__container');
const profileInfoTextNode = document.querySelector('.profile__info-text');
const editProfileCloseButton = popupEditPorfileForm.querySelector('.popup__close-button');
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
const imagePopupCloseButton= imagePopup.querySelector('.popup__close-button');

/* Enables forms validation */
const editProfileFormValidator = new FormValidator(popupEditPorfileForm, formConfig);
const addCardFormValidator = new FormValidator(addCardForm, formConfig);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();


/* Handlers definition and helper functions */
function openPopup(popup) {
  popup.addEventListener('click', handlePopupCloseByOverlay);
  document.addEventListener('keydown', handlePopupCloseByEsc);
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', handlePopupCloseByEsc);
  popup.removeEventListener('click', handlePopupCloseByOverlay);
  popup.classList.remove('popup_opened');

  if (popup.querySelector('.popup__form')) {
    popup.querySelector('.popup__form').reset();
  }
}

function handlePopupCloseAction() {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup != null) {
    closePopup(openedPopup);
  }
}

function handlePopupCloseByEsc(evt) {
  if (evt.key == 'Escape') handlePopupCloseAction();
}

function handlePopupCloseByOverlay(evt) {
  if (evt.target.classList.contains('popup')) handlePopupCloseAction();
}

function handleCardClick(evt) {
  const imageNode = evt.target;
  const imageLink = imageNode.src;
  const card = imageNode.closest('.card')
  const cardTitle = card.querySelector('.card__title').textContent;

  openPopup(imagePopup);
  popupImage.src = imageLink;
  popupImage.alt = cardTitle;
  popupFigureImageCaption.textContent = cardTitle;
}

function addNewCardFromInput() {
  const card = new Card({
    name: addCardNameInput.value,
    link: paddCardLinkInput.value
  }, '#card', handleCardClick);

  cardsListNode.prepend(card.generateCard());
}

function fillPageWithInitialPlaceCards(cards) {
  const cardNodes = cards.map(cardData => {
    const card = new Card(cardData, '#card', handleCardClick);
    return card.generateCard();
  });

  cardsListNode.append(...cardNodes);
}

function handleProfileEditPopupOpening() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;
  editProfileFormValidator.notifyFormsAboutInputChange();
  openPopup(editProfilePopup);
}

function handleAddCardPopupOpening() {
  openPopup(addNewCardPopup);
}

function handlePopupSaveButtonClick(evt) {
  evt.preventDefault();
  profileNameNode.textContent = profileNameInput.value;
  profileActivityNode.textContent = profileActivityInput.value;
  closePopup(editProfilePopup);
}

function handlePopupAddButtonClick(evt) {
  evt.preventDefault();
  addNewCardFromInput();
  closePopup(addNewCardPopup);
}


/* Add event listeners  and call functions */
popupEditPorfileForm.addEventListener('submit', handlePopupSaveButtonClick);
profileInfoEditButton.addEventListener('click', handleProfileEditPopupOpening);
editProfileCloseButton.addEventListener('click', handlePopupCloseAction);

addCardForm.addEventListener('submit', handlePopupAddButtonClick);
addCardButton.addEventListener('click', handleAddCardPopupOpening);
addCardCloseButton.addEventListener('click', handlePopupCloseAction);

imagePopupCloseButton.addEventListener('click', handlePopupCloseAction);


fillPageWithInitialPlaceCards(initialCards);
