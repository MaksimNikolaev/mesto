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

const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const openPopup = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_data_name');
const jobInput = formElement.querySelector('.popup__input_data_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const likeList = document.querySelectorAll('.elements__like');
const cardsList = document.querySelector('.elements__items');


//-------------Попап--------------------//
function togglePopup () {
  popup.classList.toggle('popup_opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function closedPopup () {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closedPopup ();
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', closedPopup);
formElement.addEventListener('submit', formSubmitHandler);
popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closedPopup();
  }
});
document.addEventListener('keydown', function (event){
  if (event.key === 'Escape') {
    closedPopup();
  }
});

//--------------------------------------//
//---------Рендеринг карточек-----------//
function renderCards (place, link) {
  const cards = document
    .querySelector('.cards-template')
    .content.firstElementChild.cloneNode(true);
  cards.querySelector('.elements__photo').src = link;
  cards.querySelector('.elements__title').textContent = place;

  

  cardsList.append(cards);
}


initialCards.forEach(card => renderCards(card.name, card.link));
//--------------------------------------//

//-------------Лайки--------------------//
likeList.forEach( element => {
  element.addEventListener( 'click', function(){
    element.classList.toggle('elements__like_active');
  });
});
//--------------------------------------//
