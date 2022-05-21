import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { initialCards, config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "../pages/index.css";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
let userId;

//рендер карточек
function renderCard(card) {
  const cardElement = createCard(card);
  section.addItem(cardElement);
}

//создание карточки
function createCard(data) {
  const card = new Card({
    name: data.name,
    link: data.link,
    likes: data.likes,
    _id: data._id,
    userId: userId,
    ownerId: data.owner._id}, ".cards-template", () => imagePopup.open(data), () => popupDeleteCard.open(card), () => {
      api.addLike(data._id)
      .then((res) => {
        card.setCountLike(res);
        card.addLike();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    });
    const cardElement = card.generateCard();
    return cardElement;
}

//Добавление карточки
function handleAddCardSubmit(item) {
  api.addCard(item.name, item.link)
  .then(res => renderCard(res))
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
  /* renderCard(item); */
  popupAddForm.close();
}

//Заполнение профиля
const handleEditProfileSubmit = (data) => {
  api.setUserInfo(data)
  .then(res => userInfo.setUserInfo(res));
  popupEditForm.close();
};

//-------Открытие Попапа редактирования профиля------//
buttonEditProfile.addEventListener("click", function () {
  popupEditForm.open();
  formValidators["editForm"].resetValidation();
  const userData = userInfo.getUserInfo();
  popupEditForm.setInputValues(userData);  
});

//-------Открытие Попапа добавления карточки--------//
buttonAddCard.addEventListener("click", () => {
  popupAddForm.open();
  formValidators["addForm"].resetValidation();
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

const imagePopup = new PopupWithImage(".popup_photo");
imagePopup.setEventListeners();
const popupAddForm = new PopupWithForm(".popup_add", handleAddCardSubmit);
popupAddForm.setEventListeners();
const popupEditForm = new PopupWithForm(".popup_edit", handleEditProfileSubmit);
popupEditForm.setEventListeners();
const popupDeleteCard = new PopupWithSubmit('.popup_deleteCard', {card: (data) => 
  api.removeCard(data._cardId)
  .then(() => {
    data.removeCard();
    popupDeleteCard.close();
})
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
});
    
popupDeleteCard.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});
/* const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".elements__items"
);
section.renderItems(); */


const api = new Api({
  url: "nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "e43cf3d4-dce7-474b-8529-7a9891978e41",
    "content-type": "application/json",
  },
});

//Получение профиля
const user = api.getInitialUser();
user.then((data) => {
  userId=data._id;
  userInfo.setUserInfo(data);
})
.catch((err) => console.log(err));

//получение карточек
const cards = api.getInitialCards();
cards.then((data) => {
  data.reverse().map((card) => {
    renderCard(card);
  });
})
.catch((err) => console.log(err));

const section = new Section(
  {
    items: [],
    renderer: renderCard
  },
  ".elements__items"
);
section.renderItems();