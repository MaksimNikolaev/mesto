const popup = document.querySelector('.popup');
const closePopup = popup.querySelector('.popup__close');
const openPopup = document.querySelector('.profile__edit-button');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const like = document.querySelectorAll('.elements__like');


//-------------Попап--------------------//
function togglePopup () {
  popup.classList.toggle('popup__opened');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

openPopup.addEventListener('click', togglePopup);
closePopup.addEventListener('click', togglePopup);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  popup.classList.toggle('popup__opened');
}

formElement.addEventListener('submit', formSubmitHandler);
//--------------------------------------//

//-------------Лайки--------------------//
like.forEach( element => {
  element.addEventListener( 'click', function(){
    element.classList.toggle('elements__like_active');
  });
});
//--------------------------------------//
