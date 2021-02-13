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
const api = new Api({
  baseUrl: apiBaseUrl,
  token: apiToken,
});

/* Enables forms validation */
const editProfileFormValidator = new FormValidator(document.forms['profile-edit-form'], formConfig);
const addCardFormValidator = new FormValidator(document.forms['add-card-form'], formConfig);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/* Retrieve user profile info */
const userInfo = new UserInfo('.profile__name', '.profile__activity');
api.getUserInfo()
        .then(res => {
          userInfo.setUserInfo(res.name, res.about);
        })
        .catch(err => {
          console.error(err.status, err.statusText);
        });

const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

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
    .catch(err => console.error(err.status, err.statusText));
}

const removeCardPopup = new PopupConfirm({
  containerSelector: '.popup_name_remove-card',
  handleFormSubmit: ({ cardId, remove }) => {
    api.deleteCard(cardId)
            .then(data => remove())
            .catch((err) => {
              err => console.error(err.status, err.statusText);
            });
  }
});
removeCardPopup.setEventListeners();

function handleCardDelete(cardId, removeCardElementHandler) {
  removeCardPopup.open({ cardId, remove: removeCardElementHandler });
}

function buildCard(item, cardTemplateSelector, cardClickHandler, cardLikeHandler, cardDeleteHandler = null, isLiked = false) {
  const card = new Card(item, cardTemplateSelector, cardClickHandler, cardLikeHandler, cardDeleteHandler);
  return card.generateCard(isLiked);
}

/* Used to render cards */
const cardList = new Section({
    items: [],
    renderer: item => buildCard(item, '#card', handleCardClick, handleCardLike)
}, '.places > .cards');

function addCardToPage(cardElement) {
  cardList.addItem(cardElement);
}

function didLike(card, userId) {
  return card.likes.some(user => {
    return user._id == userId;
  });
}

function isOwner(card, userId) {
  return card.owner._id == userId;
}

api.getInitialCards()
        .then(cards => {
          api.getUserInfo().then(user => {
            const userId = user._id;
            cards.forEach(card => {
              let cardElement = null;
              cardElement = buildCard(card, '#card',
                  handleCardClick,
                  handleCardLike,
                  isOwner(card, user._id) ? handleCardDelete : null,
                  didLike(card, user._id));
              addCardToPage(cardElement);
            });
          })
          .catch(err => console.error(err.status, err.statusText));
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
            .then(card => {
              const cardElement = buildCard(card, '#card', handleCardClick, handleCardLike, handleCardDelete);
              addCardToPage(cardElement);
            })
            .catch(err => console.error(err.status, err.statusText));
  }
});
addNewCardPopup.setEventListeners();

/* Render initial cards */
// cardList.renderElements(); Can I use that with api ?

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
