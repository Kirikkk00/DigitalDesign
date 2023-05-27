//функция для определения недели текущего месяца
function getWeekNumberInMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay() || 7;
  const adjustedDate = date.getDate() + firstDayOfWeek - 1;
  return Math.ceil(adjustedDate / 7);
}

//функция для опреления месяца даты в человеческом виде
function getMonthOfDate(date, month) {
  const numberMonth = date.getMonth();
  if ([0,1,3,4,5,6,8,9,10,11].includes(numberMonth)) {
    month = month.substring(0, month.length - 1) + "я";
  } else if ([2,7].includes(numberMonth)) {
    month = month + "a";
  }
  return month;
}

//функция для перобразования даты в человеческий вид
function getDayInfo(dateString) {
  const date = new Date(dateString);
  const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });
  let month = date.toLocaleDateString('ru-RU', { month: 'long' });
  const monthCorect = getMonthOfDate(date, month);
  const year = date.getFullYear();
  const weekNumber = getWeekNumberInMonth(date);
  const formattedDate = `${weekday}, ${weekNumber} неделя ${monthCorect} ${year} года`;
  return formattedDate;
}

//обработчик появления формы
const purchaseFormOverlay = document.querySelector('.purchase-form-overlay');
function showPurchaseForm() {
  purchaseFormOverlay.style.display = 'flex';
}
  
// Обработчик события закрытия формы
function hidePurchaseForm() {
  purchaseFormOverlay.style.display = 'none';
}
  
// Обработчик события отправки формы
function handleFormSubmit() {
  alert('Товар куплен!');
}
  
// Обработчик события прокрутки страницы
function handleScroll() {
  const scrollToTopButton = document.getElementById('scroll-to-top');
  if (window.scrollY > 1) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
}
  
// Обработчик события клика на кнопку "Наверх"
function handleScrollToTopClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
  
// Обработчик события клика на кнопку переключения темы
function handleThemeToggleClick() {
  const body = document.body;
  body.classList.toggle('dark-theme');
}
  
// Добавляем обработчики событий
document.addEventListener('DOMContentLoaded', () => {

    //обработка кнопки смены темы оформления 
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', handleThemeToggleClick);
    
    //обработка скрола
    const scrollToTopButton = document.getElementById('scroll-to-top');
    scrollToTopButton.addEventListener('click', handleScrollToTopClick);
    window.addEventListener('scroll', handleScroll);

    // Отображение зартия формы при нажатии вне формы
    purchaseFormOverlay.addEventListener('click', function (event) {
      if (event.target === purchaseFormOverlay) {
        hidePurchaseForm();
      }
    });

    //обработка нажатия кнопки "закрыть" в форме
    const closeButton = document.getElementById('close-button-form');
    closeButton.addEventListener('click', hidePurchaseForm);
  
    // Отображение формы при клике на кнопку "Купить"
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card) => {
      const buyButton = card.querySelector('.buy-button');
      buyButton.addEventListener('click', () => {
        const purchaseFormOverlay = document.querySelector('.purchase-form-overlay');
        showPurchaseForm();
      });
    });

    //обработка отправки формы
    if (purchaseFormOverlay.style.display === 'flex') {
      const purchaseForm = document.querySelector('.purchse-form');
      console.log(purchaseForm);
      purchaseForm.addEventListener('submit', (event) => {
        event.defaultPrevented();
        const quantity = document.getElementById('quantity').value;
        const color = document.querySelector('input[name="color"]:checked').value;
        const comment = documet.getElementById('comment').value; 
        handleFormSubmit();
        hidePurchaseForm();
        location.reload();
      });
      
    }

    //обработка нажатия кнопки "Купить"
    const buyButtonForm = document.getElementById('buy-button-form');
    buyButtonForm.addEventListener('click', handleFormSubmit);

    // Отображение отформатированной даты
    const formattedDateElements = document.querySelectorAll('.formatted-date');
    formattedDateElements.forEach((element) => {
      const dateString = Date.now();
      const formattedDate = getDayInfo(dateString);
      element.textContent = formattedDate;
    });
});
