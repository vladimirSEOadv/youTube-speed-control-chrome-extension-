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
        yPlayer.playbackRate = newSpeed;

        externalInputRange.value = newSpeed;
        innerlInputRange.value = newSpeed;

        externalContainer.appendChild(externaInputRangeContainer);
        innerContainer.prepend(innerInputRangeContainer);
      });
    store
      .get(["quality"])
      .then((data) => {
        return data.quality || "max";
      })
      .then((value) => {
        setQuality(value);
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
          setQuality(changes.quality);
          console.log("current quality: ", changes.quality);
          break;
        case "subtitleStatus":
          //   subtitleInput.checked = changes.subtitleStatus.newValue;
          break;
        case "translationLang":
          //   translationSelect.value = changes.translationLang.newValue;
          break;
        case "statusKeyboardControl":
          console.log("statusKeyboardControl ", changes.statusKeyboardControl);
          break;
        default:
          console.log("unknown key in handlerChangeStore", key);
          break;
      }
    }
  }
  // function checkQuality() {
  //   return (
  //     (document.querySelector(".ytp-4k-quality-badge") ||
  //       document.querySelector(".ytp-hd-quality-badge")) !== null
  //   );
  // }
  // const updateQuality = setInterval(() => {
  //   store
  //     .get(["quality"])
  //     .then((data) => {
  //       return data.quality || "max";
  //     })
  //     .then((value) => {
  //       if (checkQuality()) {
  //         setQuality(value);
  //       }
  //     });
  // }, 10000);
  store.onChanged.addListener(handlerChangeStore);
}
