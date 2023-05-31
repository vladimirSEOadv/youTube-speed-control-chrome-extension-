function mainFunc() {
  console.log("main func start");
  const yPlayer = document.querySelector(".video-stream.html5-main-video");

  // Элемент-контейнер для вставки
  const externalContainer = document.getElementById("limited-state");
  const innerContainer = document.querySelector(".ytp-chapter-container"); // Внутренний контейнер для вставки

  // Создание элементов rangeInput
  const [externaInputRangeContainer, externalInputRange] =
    createInputRange("external");

  const [innerInputRangeContainer, innerInputRange] = createInputRange("inner");

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
        innerInputRange.value = newSpeed;

        externalContainer.appendChild(externaInputRangeContainer);
        innerContainer.prepend(innerInputRangeContainer);
      });
    store
      .get(["quality"])
      .then((data) => {
        return data.quality || "max";
      })
      .then((currentQuality) => {
        setQuality(currentQuality);
      });
    store
      .get(["subtitleStatus"])
      .then((data) => {
        return data.subtitleStatus || false;
      })
      .then((currentStatus) => {
        if (currentStatus) {
          setSubtitleStatus("on");
        } else {
          setSubtitleStatus("off");
        }
        return currentStatus;
      })
      .then((currentStatus) => {
        if (currentStatus) {
          setTimeout(() => {
            store.get(["translationLang"]).then((lang) => {
              setSubtitleTranslationLanguage(lang.translationLang);
            });
          }, 5000);
        }
      });
  })();

  // Обработчик событий кликов //
  [externalInputRange, innerInputRange].forEach((element) =>
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
          innerInputRange.value = Number(changes.speed.newValue);
          yPlayer.playbackRate = Number(changes.speed.newValue);
          break;
        case "quality":
          setQuality(changes.quality.newValue);
          console.log("current quality: ", changes.quality.newValue);
          break;
        case "subtitleStatus":
          const newSubtitleStatus =
            changes.subtitleStatus.newValue === true ? "on" : "off";
          setSubtitleStatus(newSubtitleStatus);
          break;
        case "translationLang":
          setSubtitleTranslationLanguage(changes.translationLang.newValue);
          break;
        case "statusKeyboardControl":
          console.log(
            "statusKeyboardControl ",
            changes.statusKeyboardControl.newValue
          );
          break;
        default:
          console.log("unknown key in handlerChangeStore", key);
          break;
      }
    }
  }

  store.onChanged.addListener(handlerChangeStore);
}
