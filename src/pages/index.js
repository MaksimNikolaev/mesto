import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import { config } from "../utils/constants.js";
import Api from "../components/Api.js";
import "../pages/index.css";

const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonUpdateAvatar = document.querySelector(".profile__button");
let userId;

//рендер карточек
function renderCard(card) {
  const cardElement = createCard(card);
  section.addItem(cardElement);
}

//создание карточки
function createCard(data) {
  const card = new Card(
    {
      name: data.name,
      link: data.link,
      likes: data.likes,
      _id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    },
    ".cards-template",
    () => imagePopup.open(data),
    () => popupDeleteCard.open(card),
    () => {
      api
        .addLike(data._id)
        .then((res) => {
          card.setCountLike(res);
          card.addLike();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    () => {
      api
        .removeLike(data._id)
        .then((res) => {
          card.setCountLike(res);
          card.removeLike();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//Добавление карточки
function handleAddCardSubmit(item) {
  popupAddForm.renderLoading(true, "Создание...");
  api
    .addCard(item.name, item.link)
    .then((res) => renderCard(res))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddForm.renderLoading(false);
    });
  popupAddForm.close();
}

//Заполнение профиля
const handleEditProfileSubmit = (data) => {
  popupEditForm.renderLoading(true, "Сохранение...");
  api
    .setUserInfo(data)
    .then((res) => userInfo.setUserInfo(res))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditForm.renderLoading(false);
    });
  popupEditForm.close();
};

//обновление Аватара
const handleUpdateAvatarSubmit = (data) => {
  popupUpdateAvatar.renderLoading(true, "Сохранение...");
  api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res);
      popupUpdateAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupUpdateAvatar.renderLoading(false);
    });
};

//-------Открытие Попапа редактирования профиля------//
buttonEditProfile.addEventListener("click", function () {
  popupEditForm.open();
  formValidators["editForm"].resetValidation();
  const userData = userInfo.getUserInfo();
  popupEditForm.setInputValues(userData);
});

//-------Открытие Попапа обновления аватара------//
buttonUpdateAvatar.addEventListener("click", function () {
  popupUpdateAvatar.open();
  formValidators["updateAvatarForm"].resetValidation();
  const userData = userInfo.getUserInfo();
  popupUpdateAvatar.setInputValues(userData);
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
const popupUpdateAvatar = new PopupWithForm(
  ".popup_updateAvatar",
  handleUpdateAvatarSubmit
);
popupUpdateAvatar.setEventListeners();
const popupDeleteCard = new PopupWithSubmit(".popup_deleteCard", {
  card: (data) =>
    api
      .removeCard(data._cardId)
      .then(() => {
        data.removeCard();
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      }),
});

popupDeleteCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__subtitle",
  avatarSelector: ".profile__avatar",
});

const section = new Section(
  {
    items: [],
    renderer: renderCard,
  },
  ".elements__items"
);
section.renderItems();

const api = new Api({
  url: "nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "e43cf3d4-dce7-474b-8529-7a9891978e41",
    "content-type": "application/json",
  },
});

//Получение профиля
const user = api.getInitialUser();
user
  .then((data) => {
    userId = data._id;
    userInfo.setUserInfo(data);
  })
  .catch((err) => console.log(err));

//получение карточек
const cards = api.getInitialCards();
cards
  .then((data) => {
    data.reverse().map((card) => {
      renderCard(card);
    });
  })
  .catch((err) => console.log(err));
