import './index.css';
import {
  initialCards,
  formConfig,
  profileInfoEditButton,
  addCardButton
} from '../utils/constants.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';


/* Enables forms validation */
const editProfileFormValidator = new FormValidator(document.forms['profile-edit-form'], formConfig);
const addCardFormValidator = new FormValidator(document.forms['add-card-form'], formConfig);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

function handleCardClick(evt) {
  const imageElement = evt.target;
  const cardTitle = imageElement.closest('.card')
          .querySelector('.card__title')
          .textContent;

  imagePopup.open(cardTitle, imageElement.src);
}

function buildCard(item, cardTemplateSelector, cardClickHandler) {
  const card = new Card(item, cardTemplateSelector, cardClickHandler);
  return card.generateCard();
}

/* Used to render cards */
const cardList = new Section({
    items: initialCards,
    renderer: item => buildCard(item, '#card', handleCardClick)
}, '.places > .cards');

function addCardToPage(cardElement) {
  cardList.addItem(cardElement);
}

const userInfo = new UserInfo('.profile__name', '.profile__activity');

/* Create profile edit popup and set listeners */
const profileEditPopup = new PopupWithForm({
  containerSelector: '.popup_name_edit-profile',
  handleFormSubmit: ({ ['profile-name']: name, ['profile-activity']: about }) => {
    userInfo.setUserInfo(name, about);
  }
});
profileEditPopup.setEventListeners();

/* Create add-new-card popup and set listeners */
const addNewCardPopup = new PopupWithForm({
  containerSelector: '.popup_name_add-card',
  handleFormSubmit: ({ ['place-name']: name, ['place-image-url']: link }) => {
    const cardElement = buildCard({name, link}, '#card', handleCardClick);
    addCardToPage(cardElement);
  }
});
addNewCardPopup.setEventListeners();


/* Render initial cards */
cardList.renderElements();

/* Add event listeners to profile-edit and add-new-card buttons */
profileInfoEditButton.addEventListener('click', () => {
  /* Fill inputs with values from the page and notify validator */
  const {name, about} = userInfo.getUserInfo();
  profileEditPopup.setInputValues({
    'profile-name': name,
    'profile-activity': about
  });
  editProfileFormValidator.notifyFormsAboutInputChange();

  profileEditPopup.open();
});

addCardButton.addEventListener('click', () => {
  addNewCardPopup.open();
});
