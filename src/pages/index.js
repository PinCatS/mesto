import '../index.css';
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

/* Handlers */
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

/* Render initial cards list */
const cardList = new Section({
    items: initialCards,
    renderer: item => {
      const card = new Card(item, '#card', handleCardClick);
      return card.generateCard();
    }
}, '.places > .cards');

/* Create popups */
const userInfo = new UserInfo('.profile__name', '.profile__activity');

const profileEditPopup = new PopupWithForm({
  containerSelector: '.popup_name_edit-profile',
  handleFormSubmit: ({ ['profile-name']: name, ['profile-activity']: about }) => {
    userInfo.setUserInfo(name, about);
  }
});
profileEditPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm({
  containerSelector: '.popup_name_add-card',
  handleFormSubmit: ({ ['place-name']: name, ['place-image-url']: link }) => {
    const card = new Card({name, link}, '#card', handleCardClick);
    cardList.addItem(card.generateCard());
  }
});
addNewCardPopup.setEventListeners();


cardList.renderElements();

profileInfoEditButton.addEventListener('click', () => {
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
