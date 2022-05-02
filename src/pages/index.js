import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import "../pages/index.css";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const formPopupProfile = document.querySelector(".popup__form_data_edit");
const formPopupAddCard = document.querySelector(".popup__form_data_add");
const nameInput = document.querySelector(".popup__input_data_name");
const jobInput = document.querySelector(".popup__input_data_job");

//рендер карточек
function renderCard(card) {
  const cardElement = createCard(card);
  section.addItem(cardElement);
}

//создание карточки
function createCard(data) {
  const newCard = new Card(data, ".cards-template", () => {
    imagePopup.open(data.name, data.link);
  }).generateCard();
  return newCard;
}

//Добавление карточки
function handleAddCardSubmit(item) {
  renderCard(item);
  popupAddForm.close();
}

//Заполнение профиля
const handleEditProfileSubmit = (data) => {
  popupEditForm.setInputValues(data);
  userInfo.setUserInfo(data.name, data.job);
  popupEditForm.close();
};

//-------Открытие Попапа редактирования профиля------//
buttonEditProfile.addEventListener("click", function () {
  popupEditForm.open();
  formValidators["editForm"].resetErrors();
  //editFormValidator.resetErrors();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
});

//-------Открытие Попапа добавления карточки--------//
buttonAddCard.addEventListener("click", () => {
  popupAddForm.open();
  formValidators["addForm"].resetErrors();
  formValidators["addForm"].disabledButton();
  //addFormValidator.resetErrors();
  //addFormValidator.disabledButton();
});

const formValidators = {};

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);
/* const editFormValidator = new FormValidator(config, formPopupProfile);
const addFormValidator = new FormValidator(config, formPopupAddCard);
editFormValidator.enableValidation();
addFormValidator.enableValidation(); */
const imagePopup = new PopupWithImage(".popup_photo");
imagePopup.setEventListeners();
const popupAddForm = new PopupWithForm(".popup_add", handleAddCardSubmit);
popupAddForm.setEventListeners();
const popupEditForm = new PopupWithForm(".popup_edit", handleEditProfileSubmit);
popupEditForm.setEventListeners();
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__subtitle",
});
const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements__items"
);
section.renderItems();
