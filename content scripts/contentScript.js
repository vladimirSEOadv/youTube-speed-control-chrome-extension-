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
  const externalContainer = document.getElementById("limited-state");
  const innerContainer = document.querySelector(".ytp-chapter-container"); // Внутренний контейнер для вставки
  innerContainer.style.display = "flex";

  // Создание элементов rangeInput
  const externaInputRangeContainer = createInputRange("external"); // Внешний контейнер для вставки
  const externalInputRange = externaInputRangeContainer.querySelector(
    "#external-range-input"
  );

  const innerInputRangeContainer = createInputRange("inner");
  const innerlInputRange =
    innerInputRangeContainer.querySelector("#inner-range-input");

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

        externalInputRange.value = newSpeed;
        innerlInputRange.value = newSpeed;

        externalContainer.appendChild(externaInputRangeContainer);
        innerContainer.prepend(innerInputRangeContainer);
      });
  }
  initValues();

  function changeSpeed(value) {
    set({ speed: value });
  }

  // Обработчик событий кликов //
  [externalInputRange, innerlInputRange].forEach((element) =>
    element.addEventListener("click", (event) => {
      const currentSpeed = event.target.value;
      changeSpeed(currentSpeed);
    })
  );

  function handlerChangeStore(changes) {
    console.log("changes", changes);
    for (let key in changes) {
      switch (key) {
        case "speed":
          externalInputRange.value = Number(changes.speed.newValue);
          innerlInputRange.value = Number(changes.speed.newValue);

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
