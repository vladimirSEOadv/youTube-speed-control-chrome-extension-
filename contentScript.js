let checkExist = setInterval(function () {
  const videoElement = document.getElementById("limited-state");
  if (videoElement) {
    clearInterval(checkExist);
    // выполнить код, когда элемент-контейнер будет доступен
    mainfunc();
  }
}, 100);

function mainfunc() {
  const yPlayer = document.querySelector(".video-stream.html5-main-video");
  let videoSpeed =
    localStorage.getItem("youTubeVideoSpeed") != null
      ? Number(localStorage.getItem("youTubeVideoSpeed"))
      : yPlayer.playbackRate;
  const stepCounter = 0.25;

  const elementIdForInsert = "limited-state"; // Элемент-контейнер для вставки

  // Установить качество видео на HD
  // (function setmaxQuality() {
  //   // Найти кнопку настройки качества видео
  //   const settingsButton = document.querySelector(".ytp-settings-button");

  //   if (settingsButton) {
  //     // Открыть меню настройки качества видео
  //     settingsButton.click();
  //     // Найти элемент c текстом "Качество"
  //     const popap = document.querySelector(".ytp-settings-menu");
  //     const qualityLabel = [
  //       ...popap.querySelectorAll(".ytp-menuitem-label"),
  //     ].find((label) => label.innerText === "Качество");

  //     if (qualityLabel) {
  //       qualityLabel.click(); // После этого попап обновляется
  //       let checkQualityButton = setInterval(function () {
  //         const maxQuality = document.querySelectorAll(".ytp-menuitem")[0]; // Выбрать первое в списке качество видео
  //         if (maxQuality) {
  //           maxQuality.click();
  //           console.log("maxQuality", maxQuality);
  //           clearInterval(checkQualityButton);
  //         }
  //       }, 3000);
  //     }
  //   }
  // })();

  // =================================================================================================

  // function subtitlesOn() {
  //   const subtitlesIcon = document.querySelector(".ytp-subtitles-button");
  //   let status = subtitlesIcon.getAttribute("aria-pressed") === "true";
  //   if (!status) {
  //     subtitlesIcon.click(); // Если субтитры выключенны, включить их
  //   }
  //   //   // Найти кнопку настройки качества видео
  //   const settingsButton = document.querySelector(".ytp-settings-button");
  //   // Кликнуть по ней
  //   settingsButton.click();
  //   // Получить окно попапа
  //   let popap = document.querySelector(".ytp-panel-menu,style-scope");
  //   const subtitlesInMenuLabel = [...popap.querySelectorAll("span")].find(
  //     (label) => label.innerText === "Субтитры"
  //   );
  //   subtitlesInMenuLabel.click();
  //   // Нужна задержка, popap должен успеть обновиться
  //   setTimeout(() => {
  //     popap = document.querySelector(".ytp-panel-menu,style-scope");
  //     const translateSubtitlesLabel = [
  //       ...popap.querySelectorAll(".ytp-menuitem-label"),
  //     ].find((label) => label.innerText === "Перевести");
  //     translateSubtitlesLabel.click();
  //   }, 1000);
  //   // Нужна задержка, popap должен успеть обновиться
  //   setTimeout(() => {
  //     popap = document.querySelector(".ytp-panel-menu,style-scope");
  //     const russianSubtitlesLabel = [
  //       ...popap.querySelectorAll(".ytp-menuitem-label"),
  //     ].find((label) => label.innerText === "Русский");
  //     russianSubtitlesLabel.click();
  //   }, 2000);
  // }
  // subtitlesOn();

  // Создание элементов интерфейса
  const divSpeedCounter = document.createElement("div");
  divSpeedCounter.style.margin = "10px";
  divSpeedCounter.style.height = "25px";
  divSpeedCounter.style.width = "230px";
  divSpeedCounter.style.fontSize = "30px";
  divSpeedCounter.style.display = "flex";
  divSpeedCounter.style.justifyContent = "center";
  divSpeedCounter.textContent = yPlayer.playbackRate;
  divSpeedCounter.classList.add("video-counter");

  document.getElementById(elementIdForInsert).appendChild(divSpeedCounter);

  //Конструктор кнопок
  function elementCreator(elementType, backgroundColor, elemText, elemId) {
    element = document.createElement(elementType);
    element.id = elemId;
    element.textContent = elemText;
    element.style.backgroundColor = backgroundColor;
    element.style.cssText +=
      "margin: 10px; height: 25px; width: 55px; color: white;";
    document.getElementById(elementIdForInsert).appendChild(element);
    return element;
  }

  // Обработчик событий кликов
  document
    .getElementById(elementIdForInsert)
    .addEventListener("click", (event) => {
      switch (event.target.id) {
        case "fast-button-for-yt-video":
          videoSpeed = videoSpeed + stepCounter;
          break;
        case "normal-button-for-yt-video":
          videoSpeed = 1.0;
          break;
        case "slow-button-for-yt-video":
          videoSpeed = videoSpeed - stepCounter;
          break;
      }
      yPlayer.playbackRate = videoSpeed;
      localStorage.setItem("youTubeVideoSpeed", videoSpeed);
      divSpeedCounter.innerHTML = videoSpeed;
    });

  const ButtonSlow = elementCreator(
    "button",
    "red",
    "slow",
    "slow-button-for-yt-video"
  );
  const ButtonNormal = elementCreator(
    "button",
    "black",
    "normal",
    "normal-button-for-yt-video"
  );
  const ButtonFast = elementCreator(
    "button",
    "green",
    "fast",
    "fast-button-for-yt-video"
  );

  // Обновление скорости воспроизведения при запуске
  function autoUpdateVideoSpeed() {
    if (
      document
        .querySelector("#movie_player")
        .classList.contains("playing-mode") &&
      document.querySelector(".video-stream.html5-main-video").playbackRate !=
        videoSpeed
    ) {
      document.querySelector(".video-stream.html5-main-video").playbackRate =
        videoSpeed;
      divSpeedCounter.innerHTML = videoSpeed;
      localStorage.setItem("youTubeVideoSpeed", videoSpeed);
    }
  }
  setInterval(autoUpdateVideoSpeed, 5000);

  // Функция для управления с клавиатуры
  (function keyboardControl() {
    console.log("keyBordControlFunc on");
    document.addEventListener("keydown", keyBordHandler);
    let statusKeyBordControl =
      localStorage.getItem("statusKeyBordControl") != null
        ? localStorage.getItem("statusKeyBordControl")
        : false;

    function keyBordHandler(e) {
      if (e.code == "NumLock") {
        statusKeyBordControl = !statusKeyBordControl;
      }
      if (e.code == "KeyA" && statusKeyBordControl) {
        videoSpeed = videoSpeed - stepCounter;
        yPlayer.playbackRate = videoSpeed;
        localStorage.setItem("youTubeVideoSpeed", videoSpeed);
        divSpeedCounter.innerHTML = videoSpeed;
      }
      if (e.code == "KeyS" && statusKeyBordControl) {
        videoSpeed = 1.0;
        yPlayer.playbackRate = videoSpeed;
        localStorage.setItem("youTubeVideoSpeed", videoSpeed);
        divSpeedCounter.innerHTML = videoSpeed;
      }
      if (e.code == "KeyD" && statusKeyBordControl) {
        videoSpeed = videoSpeed + stepCounter;
        yPlayer.playbackRate = videoSpeed;
        localStorage.setItem("youTubeVideoSpeed", videoSpeed);
        divSpeedCounter.innerHTML = videoSpeed;
      }
      localStorage.setItem("statusKeyBordControl", statusKeyBordControl);
    }
  })();
}
