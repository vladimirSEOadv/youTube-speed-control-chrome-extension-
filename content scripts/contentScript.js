function mainfunc() {
  console.log("main func start");
  const yPlayer = document.querySelector(".video-stream.html5-main-video");

  // Элемент-контейнер для вставки
  const externalContainer = document.getElementById("limited-state");
  const innerContainer = document.querySelector(".ytp-chapter-container"); // Внутренний контейнер для вставки

  // Создание элементов rangeInput
  const [externaInputRangeContainer, externalInputRange] =
    createInputRange("external");

  const [innerInputRangeContainer, innerlInputRange] =
    createInputRange("inner");

  // Функция для инициализации начальных значений
  (function initValues() {
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
  })();

  // Обработчик событий кликов //
  [externalInputRange, innerlInputRange].forEach((element) =>
    element.addEventListener("click", (event) => {
      const currentSpeed = event.target.value;
      set({ speed: currentSpeed });
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
}
