// выполнить код, когда элемент-контейнер будет доступен
const injectFunc = setInterval(function () {
  const videoElement = document.getElementById("limited-state");
  if (videoElement) {
    clearInterval(injectFunc);
    mainfunc();
  }
}, 100);
