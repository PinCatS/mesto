const addCardPopupElementData = {
  popupName: 'popup_name_add-card',
  form: {
    name: 'add-card-form',
    title: 'Новое место',
    info: {
      inputs: [
        {
          name: "place-name",
          placeholder: "Название",
          classList: ['popup__input_name_place-name'],
        },
        {
          name: "place-image-url",
          placeholder: "Ссылка на картинку",
          classList: ['popup__input_name_place-image-url'],
        },
      ],
      submitButton: {
        text: "Создать",
      }
    }
  }
}

const profileEditPopupElementData = {
  popupName: 'popup_name_edit-profile',
  form: {
    name: 'profile-edit-form',
    title: 'Редактировать профиль',
    info: {
      inputs: [
        {
          name: "profile-name",
          placeholder: "Имя профиля",
          classList: ['popup__input_name_name'],
        },
        {
          name: "profile-activity",
          placeholder: "Деятельность",
          classList: ['popup__input_name_activity'],
        },
      ],
      submitButton: {
        text: "Сохранить",
      }
    }
  }
}

/* Getting form, profile info and buttons */
const popupNode = buildPopup(profileEditPopupElementData);
const popupForm = popupNode.querySelector('.popup__container');
const profileInfoTextNode = document.querySelector('.profile__info-text');

const popupCloseButton = popupForm.querySelector('.popup__close-button');
const profileInfoEditButton = profileInfoTextNode.querySelector('.profile__edit-button');

const popupAddCard = buildPopup(addCardPopupElementData);
const addCardForm = popupAddCard.querySelector('.popup__container');
const addCardCloseButton = addCardForm.querySelector('.popup__close-button');
const addCardButton = document.querySelector('.profile__add-button');

/* Getting nodes with profile name and activity */
const profileNameNode = profileInfoTextNode.querySelector('.profile__name');
const profileActivityNode = profileInfoTextNode.querySelector('.profile__activity');

/* Getting form name and activity inputs */
const profileNameInput = popupNode.querySelector('.popup__input_name_name');
const profileActivityInput = popupNode.querySelector('.popup__input_name_activity');


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

function buildPopup(popupElementData) {
  const popupTemplate = document.querySelector('#popup').content;

  const popupCloneContent = popupTemplate.cloneNode(true);
  const popupNode = popupCloneContent.querySelector('.popup');
  popupNode.classList.add(popupElementData.popupName);

  const formNode = popupNode.querySelector('.popup__container');
  formNode.name = popupElementData.form.name;

  formNode.querySelector('.popup__heading').textContent = popupElementData.form.title;

  const formInputNodes = formNode.querySelectorAll('.popup__input');
  formInputNodes.forEach((inputNode, i) => {
    inputNode.name = popupElementData.form.info.inputs[i].name;
    inputNode.placeholder = popupElementData.form.info.inputs[i].placeholder;
    for (let cls of popupElementData.form.info.inputs[i].classList) {
      inputNode.classList.add(cls);
    }
  });

  formNode.querySelector('.popup__save-button').textContent = popupElementData.form.info.submitButton.text;

  document.querySelector('.page').append(popupNode);

  return popupNode;
}

function addNewCard(evt) {
  evt.preventDefault();
  console.log('Add new card event!', evt);
  closePopup(evt);
}


/* Add event listeners */
popupForm.addEventListener('submit', savePopupInput);
popupCloseButton.addEventListener('click', closePopup);
profileInfoEditButton.addEventListener('click', openPopup);

addCardForm.addEventListener('submit', addNewCard);
addCardCloseButton.addEventListener('click', closePopup);
addCardButton.addEventListener('click', openPopup);
