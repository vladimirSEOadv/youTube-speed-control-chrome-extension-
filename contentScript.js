let checkExist = setInterval(function () {
  const videoElement = document.getElementById("limited-state");
  if (videoElement) {
    clearInterval(checkExist);
    // выполнить код, когда элемент-контейнер будет доступен
    mainfunc();
  }
}, 100);

function mainfunc() {
  console.log("main func start");
  const yPlayer = document.querySelector(".video-stream.html5-main-video");

  // Элемент-контейнер для вставки
  const ELEMENTIDFORINSERT = "limited-state";

  // Создание элементов rangeInput
  const rangeInputContainer = createInputRange();
  console.log(rangeInputContainer);
  const rangeInput = rangeInputContainer.querySelector("#range-input");

  // Функция для инициализации начальных значений
  function initValues() {
    store
      .get(["speed"])
      .then((data) => {
        return Number(data.speed) || 1;
      })
      .then((newSpeed) => {
        console.log("init speed", newSpeed);
        yPlayer.playbackRate = newSpeed;
        rangeInput.value = newSpeed;
        document
          .getElementById(ELEMENTIDFORINSERT)
          .appendChild(rangeInputContainer);
      });
  }
  initValues();

  function changeSpeed(value) {
    set({ speed: value });
  }

  // Обработчик событий кликов
  rangeInput.addEventListener("click", async (event) => {
    const currentSpeed = event.target.value;
    changeSpeed(currentSpeed);
  });

  function handlerChangeStore(changes) {
    console.log("changes", changes);
    for (let key in changes) {
      switch (key) {
        case "speed":
          rangeInput.value = Number(changes.speed.newValue);
          yPlayer.playbackRate = Number(changes.speed.newValue);
          break;
        case "quality":
          //   qualitySelect.value = changes.quality.newValue;
          break;
        case "subtitleStatus":
          //   subtitleInput.checked = changes.subtitleStatus.newValue;
          break;
        case "translationLang":
          //   translationSelect.value = changes.translationLang.newValue;
          break;
        default:
          console.log("unknown key in handlerChangeStore", key);
          break;
      }
    }
  }

  store.onChanged.addListener(handlerChangeStore);

  // Функция для управления с клавиатуры
  keyboardControl();
}
