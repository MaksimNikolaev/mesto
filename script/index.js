const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const openPopup = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_data_name');
const jobInput = formElement.querySelector('.popup__input_data_job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const likeList = document.querySelectorAll('.elements__like');


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
  popup.classList.toggle('popup_opened');
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

//-------------Лайки--------------------//
likeList.forEach( element => {
  element.addEventListener( 'click', function(){
    element.classList.toggle('elements__like_active');
  });
});
//--------------------------------------//
