const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Getting form, profile info and buttons */
const popupNode = document.querySelector('.popup_name_edit-profile');
const popupForm = popupNode.querySelector('.popup__container');
const profileInfoTextNode = document.querySelector('.profile__info-text');

const popupCloseButton = popupForm.querySelector('.popup__close-button');
const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

const popupAddCard = document.querySelector('.popup_name_add-card');
const addCardForm = popupAddCard.querySelector('.popup__container');
const addCardCloseButton = addCardForm.querySelector('.popup__close-button');
const addCardButton = document.querySelector('.profile__add-button');

/* Getting nodes with profile name and activity */
const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

/* Getting form name and activity inputs */
const profileNameInput = popupForm.querySelector('.popup__input_name_name');
const profileActivityInput = popupForm.querySelector('.popup__input_name_activity');

/* Getting add-card-form name and link nodes */
const places = document.querySelector(".places > .cards");
const addCardNameInput = addCardForm.querySelector('.popup__input_name_place-name');
const paddCardLinkInput = addCardForm.querySelector('.popup__input_name_place-image-url');

/* Getting image popup info */
const imagePopup = document.querySelector(".image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close-button");


fillPlacesWithCards(initialCards);

/* Handlers definition and helper functions */
function populateInputWithCurrentValues() {
  profileNameInput.value = profileNameNode.textContent;
  profileActivityInput.value = profileActivityNode.textContent;
}

function closePopup(evt) {
  const formName = evt.target.closest(".popup__container").name;

  switch(formName) {
    case "profile-edit-form":
      popupNode.classList.remove('popup_opened');
      break;
    case "add-card-form":
      popupAddCard.classList.remove('popup_opened');
  }
}

function openPopup(evt) {
    const buttonLabel = evt.target.ariaLabel;

    switch(buttonLabel) {
      case "Редактировать профиль":
        popupNode.classList.add('popup_opened');
        populateInputWithCurrentValues();
        break;
      case "Добавить карточку":
        popupAddCard.classList.add('popup_opened');
    }
}

function savePopupInput(evt) {
  evt.preventDefault();

  profileNameNode.textContent = profileNameInput.value;
  profileActivityNode.textContent = profileActivityInput.value;

  closePopup(evt);
}

function addNewCard(evt) {
  evt.preventDefault();

  const cardFragment = buildCard(addCardNameInput.value, paddCardLinkInput.value);
  places.prepend(cardFragment);

  closePopup(evt);
}

function buildCard(name, imageUrl) {
  const cardTemplate = document.querySelector('#card').content;
  const card = cardTemplate.cloneNode(true);

  const cardImageNode = card.querySelector('.card__image');
  cardImageNode.src = imageUrl;
  cardImageNode.alt = name;
  cardImageNode.addEventListener('click', openImagePopup);

  card.querySelector('.card__title').textContent = name;

  card.querySelector('.card__like-button').addEventListener('click', handleLikeButtonClick);
  card.querySelector('.card__remove-button').addEventListener('click', removeCard);

  return card;
}

function openImagePopup(evt) {
  const card= evt.target.closest('.card');
  const imageSrc = evt.target.src;
  const cardTitle = card.querySelector('.card__title').textContent;

  const imagePopup = document.querySelector('.image-popup');
  imagePopup.classList.add('popup_opened');

  const popupImage = imagePopup.querySelector('.image-popup__image');
  popupImage.src = imageSrc;
  popupImage.alt = cardTitle;

  imagePopup.querySelector('.image-popup__caption').textContent = cardTitle;
}

function closeImagePopup(evt) {
  const imagePopup = document.querySelector('.image-popup');
  imagePopup.classList.remove('popup_opened');
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

function removeCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}

function fillPlacesWithCards(cards) {
  for (let {name, link} of cards) {
    places.append(buildCard(name, link));
  }
}


/* Add event listeners */
popupForm.addEventListener('submit', savePopupInput);
popupCloseButton.addEventListener('click', closePopup);
profileInfoEditButton.addEventListener('click', openPopup);

addCardForm.addEventListener('submit', addNewCard);
addCardCloseButton.addEventListener('click', closePopup);
addCardButton.addEventListener('click', openPopup);

imagePopupCloseButton.addEventListener('click', closeImagePopup);
