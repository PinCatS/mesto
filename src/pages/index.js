import './index.css';
import {
  formConfig,
  profileInfoEditButton,
  addCardButton,
  apiBaseUrl,
  apiToken
} from '../utils/constants';
import Api from '../components/Api'
import FormValidator from '../components/FormValidator';
import Section from '../components/Section';
import Card from '../components/Card';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

/* Create API */
const api = new Api({
  baseUrl: apiBaseUrl,
  token: apiToken,
});

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

/* Retrieve user profile info */
const userInfo = new UserInfo('.profile__name', '.profile__activity');
api.getUserInfo()
        .then(res => {
          userInfo.setUserInfo(res.name, res.about);
        })
        .catch(err => {
          console.error(err.status, err.statusText);
        });

/* Used to render cards */
const cardList = new Section({
    items: [],
    renderer: item => buildCard(item, '#card', handleCardClick)
}, '.places > .cards');

function addCardToPage(cardElement) {
  cardList.addItem(cardElement);
}

api.getInitialCards()
        .then(cards => {
          cards.forEach(card => {
            const cardElement = buildCard(card, '#card', handleCardClick);
            addCardToPage(cardElement);
          });
        })
        .catch(err => console.error(err.status, err.statusText));

/* Create profile edit popup and set listeners */
const profileEditPopup = new PopupWithForm({
  containerSelector: '.popup_name_edit-profile',
  handleFormSubmit: ({ ['profile-name']: name, ['profile-activity']: about }) => {
    api.setProfile(name, about)
            .then(res => {
              userInfo.setUserInfo(res.name, res.about);
            })
            .catch(err => console.error(err.status, err.statusText));
  }
});
profileEditPopup.setEventListeners();

/* Create add-new-card popup and set listeners */
const addNewCardPopup = new PopupWithForm({
  containerSelector: '.popup_name_add-card',
  handleFormSubmit: ({ ['place-name']: name, ['place-image-url']: link }) => {
    api.addCard(name, link)
            .then(res => {
              const cardElement = buildCard({name: res.name, link: res.link}, '#card', handleCardClick);
              addCardToPage(cardElement);
            })
            .catch(err => console.error(err.status, err.statusText));
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
