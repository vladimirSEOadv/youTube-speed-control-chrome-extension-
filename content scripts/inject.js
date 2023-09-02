// выполнить код, когда элемент-контейнер будет доступен
const injectInterval = setInterval(function () {
  const videoElement = document.getElementById("limited-state");
  if (videoElement) {
    clearInterval(injectInterval);
    // Основная функция
    mainFunc();
    // Функция для управления с клавиатуры
    keyboardControl();
  }
}, 100);
