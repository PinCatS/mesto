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


function handleCardClick(evt) {
  const imageElement = evt.target;
  const cardTitle = imageElement.closest('.card')
          .querySelector('.card__title')
          .textContent;

  const imagePopup = new PopupWithImage({
    src: imageElement.src,
    title: cardTitle
  },'.image-popup');

  imagePopup.setEventListeners();
  imagePopup.open();
}

/* Used to render cards */
const cardList = new Section({
    items: initialCards,
    renderer: item => {
      const card = new Card(item, '#card', handleCardClick);
      return card.generateCard();
    }
}, '.places > .cards');


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
    const card = new Card({name, link}, '#card', handleCardClick);
    cardList.addItem(card.generateCard());
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
