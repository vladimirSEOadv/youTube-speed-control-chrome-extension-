function mainFunc() {
  console.log("main func youtube speed control start");
  const yPlayer = document.querySelector(".video-stream.html5-main-video");

  const externalContainer = document.getElementById("limited-state"); // Внешний элемент-контейнер для вставки
  const innerContainer = document.querySelector(".ytp-chapter-container"); // Внутренний элемент-контейнер для вставки

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
    store
      .get(["pauseOnMouseLeave"])
      .then((data) => {
        return data.pauseOnMouseLeave;
      })
      .then((status) => {
        const action = status ? "add" : "remove";
        setPauseOnMouseLeave(yPlayer, action);
      });
  })();

  // Обработчик событий кликов //
  [externalInputRange, innerInputRange].forEach((element) =>
    element.addEventListener("click", (event) => {
      const currentSpeed = event.target.value;
      set({ speed: currentSpeed });
    })
  );

  // Функция которая запускаеться при изменениях в local store
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
        case "pauseOnMouseLeave":
          console.log("pauseOnMouseLeave", changes.pauseOnMouseLeave.newValue);
          setPauseOnMouseLeave(
            yPlayer,
            changes.pauseOnMouseLeave.newValue ? "add" : "remove"
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
