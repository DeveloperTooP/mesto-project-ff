// Шаблон карточки, который используется для создания новых карточек
const cardTemplate = document.querySelector('#card-template').content;

// Контейнер, в который будут добавляться карточки
const cardContainer = document.querySelector('.places__list');

// Функция для создания новой карточки на основе переданных данных
function createCard(cardData, deleteHandler) {
  // Клонируем шаблон карточки
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
  // Находим элементы внутри карточки и заполняем их данными
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Добавляем обработчик события для кнопки удаления карточки
  deleteButton.addEventListener('click', () => deleteHandler(cardElement));
  
  return cardElement;
}

// Функция для удаления карточки из DOM
function deleteCard(card) { 
  card.remove(); 
}

// Создаем и добавляем карточки на страницу
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard);
  cardContainer.append(cardElement);
});


