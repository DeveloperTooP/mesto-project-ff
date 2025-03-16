import { addLike, removeLike, deleteCard } from './api.js';

export const createCard = (
  cardData,
  { cardTemplate, handleDeleteCard, handleImageClick, userId }
) => {
  if (!cardData._id || !cardData.name || !cardData.link) {
    return;
  }

  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  // Устанавливаем начальное значение счётчика лайков
  cardLikeCounter.textContent = (cardData.likes || []).length;

  // Проверяем, ставил ли пользователь лайк, и обновляем класс кнопки
  if (cardData.likes.some(user => user._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Настраиваем удаление карточки, если она принадлежит текущему пользователю
  if (cardData.owner._id === userId) {
    cardDeleteButton.classList.remove('card__delete-button_disabled');
    cardDeleteButton.addEventListener('click', () => handleDeleteCard(cardElement, cardData));
  } else {
    cardDeleteButton.classList.add('card__delete-button_disabled');
  }

  // Обработчик клика по кнопке лайка – логика лайка также находится здесь
  cardLikeButton.addEventListener('click', () => handleLikeCard(cardData._id, cardLikeButton, cardElement));

  cardImage.addEventListener('click', () => handleImageClick(cardData));

  return cardElement;
};

// Функция обработки лайка карточки
export function handleLikeCard(cardId, likeButton, cardElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likePromise = isLiked ? removeLike(cardId) : addLike(cardId);

  likePromise
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active', !isLiked);
      // Находим элемент счётчика внутри карточки
      const likeCounter = cardElement.querySelector('.card__like-counter');
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.error('Ошибка при обновлении лайка:', err));
}

// Обработчик удаления карточки
export const handleDeleteCard = (cardElement, cardData) => {
  deleteCard(cardData._id)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => console.error('Ошибка при удалении карточки:', err));
};
