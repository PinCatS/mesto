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
import PopupConfirm from '../components/PopupConfirm';
import UserInfo from '../components/UserInfo';

/* Create API */
const api = new Api(apiBaseUrl, {
  authorization: apiToken,
  'content-type': 'application/json'
});

/* Enables forms validation */
const editProfileFormValidator = new FormValidator(document.forms['profile-edit-form'], formConfig);
const addCardFormValidator = new FormValidator(document.forms['add-card-form'], formConfig);
const updateAvatarFormValidator = new FormValidator(document.forms['profile-update-avatar-form'], formConfig);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

function onRequestError(apiErr, msg) {
  const apiErrorMsg = apiErr
          ? `${apiErr.status} ${apiErr.statusText}`
          : null;
  console.error(msg, apiErr);
}

function didLike(card, userId) {
  return card.likes.some(user => {
    return user._id == userId;
  });
}

function isOwner(card, userId) {
  return card.owner._id == userId;
}


const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const removeCardPopup = new PopupConfirm({
  containerSelector: '.popup_name_remove-card',
  handleFormSubmit: ({ cardId, remove }) => {
    api
      .deleteCard(cardId)
      .then(remove)
      .catch(err => onRequestError(err, 'Failed to remove card.'));
  }
});
removeCardPopup.setEventListeners();

const profileEditPopup = new PopupWithForm({
  containerSelector: '.popup_name_edit-profile',
  handleFormSubmit: ({ ['profile-name']: name, ['profile-activity']: about }) => {
    api
      .setProfile(name, about)
      .then(res => userInfo.setUserInfo(res.name, res.about))
      .catch(err => onRequestError(err, 'Failed to edit profile.'));
  }
});
profileEditPopup.setEventListeners();

const addNewCardPopup = new PopupWithForm({
  containerSelector: '.popup_name_add-card',
  handleFormSubmit: ({ ['place-name']: name, ['place-image-url']: link }) => {
    api
      .addCard(name, link)
      .then(card => {
        const cardElement = buildCard(card, '#card', handleCardClick, handleCardLike, handleCardDelete);
        cardList.addItem(cardElement);
      })
      .catch(err => onRequestError(err, 'Failed to add new card.'));
  }
});
addNewCardPopup.setEventListeners();


function handleCardClick(evt) {
  const imageElement = evt.target;
  const cardTitle = imageElement.closest('.card')
          .querySelector('.card__title')
          .textContent;

  imagePopup.open(cardTitle, imageElement.src);
}

function handleCardLike(like) {
  let liked = null;
  if (like.isActive) {
    liked = api.removeLike(like.id);
  } else {
    liked = api.setLike(like.id);
  }

  liked
    .then(card => like.likeCounterElement.textContent = card.likes.length)
    .catch(err => onRequestError(err, 'Failed to like card.'));
}

function handleCardDelete(cardId, removeCardElementHandler) {
  removeCardPopup.open({ cardId, remove: removeCardElementHandler });
}


function buildCard(item, cardTemplateSelector, cardClickHandler, cardLikeHandler, cardDeleteHandler = null, isLiked = false) {
  const card = new Card(item, cardTemplateSelector, cardClickHandler, cardLikeHandler, cardDeleteHandler);
  return card.generateCard(isLiked);
}


/* Retrieve user profile info and set to page */
const userInfo = new UserInfo('.profile__name', '.profile__activity');
api
  .getUserInfo()
  .then(res => userInfo.setUserInfo(res.name, res.about))
  .catch(err => onRequestError(err, 'Failed to get user info.'));


/* Render initial cards */
api
  .getCards()
  .then(cards => {

    api
      .getUserInfo()
      .then(user => {
        const cardList = new Section({
          items: cards,
          renderer: item => buildCard(item, '#card',
                  handleCardClick,
                  handleCardLike,
                  isOwner(item, user._id) ? handleCardDelete : null,
                  didLike(item, user._id))
        }, '.places > .cards');

        cardList.renderElements();
      })
      .catch(err => onRequestError(err, 'Failed to get user info.'));
  })
  .catch(err => onRequestError(err, 'Failed to get cards.'));


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
