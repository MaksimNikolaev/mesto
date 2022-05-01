import Card from '../components/card.js'
import FormValidator from '../components/FormValidator.js'
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'
import { initialCards } from '../utils/data.js'
import '../pages/index.css';

export const photoFull = document.querySelector('.popup__photo');
export const photoCaption = document.querySelector('.popup__caption');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
const formPopupProfile = document.querySelector('.popup__form_data_edit');
const formPopupAddCard = document.querySelector('.popup__form_data_add');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');

//рендер карточек
function renderCard(card) {
  const cardElement = createCard(card);
  section.addItem(cardElement);
}

//создание карточки
function createCard(data) {
  const newCard = new Card(data, '.cards-template', () => { imagePopup.open(data.name, data.link) }).generateCard();
  return newCard;
}

//Добавление карточки
function handleAddCardSubmit(item) {
  renderCard(item);
  popupAddForm.close();
}

//Заполнение профиля
const handleEditProfileSubmit = () => {
  userInfo.setUserInfo();
  popupEditForm.close();
};

//-------Открытие Попапа редактирования профиля------//
buttonEditProfile.addEventListener('click', function () {
  popupEditForm.open();
  editFormValidator.resetErrors();
  userInfo.getUserInfo();
});

//-------Открытие Попапа добавления карточки--------//
buttonAddCard.addEventListener('click', () => {
  popupAddForm.open();
  addFormValidator.resetErrors();
  addFormValidator.disabledButton();
});


const data = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error',
};

const editFormValidator = new FormValidator(data, formPopupProfile);
const addFormValidator = new FormValidator(data, formPopupAddCard);
editFormValidator.enableValidation();
addFormValidator.enableValidation();
const imagePopup = new PopupWithImage('.popup_photo');
imagePopup.setEventListeners();
const popupAddForm = new PopupWithForm('.popup_add', handleAddCardSubmit);
popupAddForm.setEventListeners();
const popupEditForm = new PopupWithForm('.popup_edit', handleEditProfileSubmit);
popupEditForm.setEventListeners();
const userInfo = new UserInfo('.popup__input_data_name', '.popup__input_data_job');
const section = new Section({ items: initialCards, renderer: renderCard }, '.elements__items');
section.renderer();
