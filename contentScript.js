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
  let videoSpeed;
  if (localStorage.getItem("youTubeVideoSpeed") != null) {
    videoSpeed = Number(localStorage.getItem("youTubeVideoSpeed"));
  } else {
    videoSpeed = yPlayer.playbackRate;
  }
  const stepCounter = 0.25;

  const elementIdForInsert = "limited-state"; // Элемент-контейнер для вставки

  // Создание элементов интерфейса
  const divSpeedCounter = document.createElement("div");
  Object.assign(divSpeedCounter.style, {
    margin: "10px",
    height: "25px",
    width: "230px",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
  });
  divSpeedCounter.textContent = yPlayer.playbackRate;
  divSpeedCounter.classList.add("video-counter");

  document.getElementById(elementIdForInsert).appendChild(divSpeedCounter);

  //Конструктор кнопок
  function elementCreator(elementType, backgroundColor, elemText, elemId) {
    const element = document.createElement(elementType);
    element.id = elemId;
    element.textContent = elemText;
    element.style.backgroundColor = backgroundColor;
    Object.assign(element.style, {
      margin: "10px",
      height: "25px",
      width: "55px",
      color: "white",
    });
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
        default:
          break;
      }
      yPlayer.playbackRate = videoSpeed;
      localStorage.setItem("youTubeVideoSpeed", videoSpeed);
      divSpeedCounter.innerHTML = videoSpeed;
    });

  elementCreator("button", "red", "slow", "slow-button-for-yt-video");
  elementCreator("button", "black", "normal", "normal-button-for-yt-video");
  elementCreator("button", "green", "fast", "fast-button-for-yt-video");

  // Обновление скорости воспроизведения при запуске
  function autoUpdateVideoSpeed() {
    const moviePlayer = document.querySelector("#movie_player");
    const playingMode = moviePlayer.classList.contains("playing-mode");
    const player = document.querySelector(".video-stream.html5-main-video");
    const playbackRateIsCurrent = player.playbackRate === videoSpeed;

    if (playingMode && !playbackRateIsCurrent) {
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
      if (e.code === "NumLock") {
        statusKeyBordControl = !statusKeyBordControl;
        return;
      } else if (!statusKeyBordControl) {
        return;
      } else {
        console.log("KeyBordControl ", statusKeyBordControl);
      }

      switch (e.code) {
        case "KeyA":
          videoSpeed = videoSpeed - stepCounter;
          yPlayer.playbackRate = videoSpeed;
          localStorage.setItem("youTubeVideoSpeed", videoSpeed);
          divSpeedCounter.innerHTML = videoSpeed;
          break;
        case "KeyS":
          videoSpeed = 1.0;
          yPlayer.playbackRate = videoSpeed;
          localStorage.setItem("youTubeVideoSpeed", videoSpeed);
          divSpeedCounter.innerHTML = videoSpeed;
          break;
        case "KeyD":
          videoSpeed = videoSpeed + stepCounter;
          yPlayer.playbackRate = videoSpeed;
          localStorage.setItem("youTubeVideoSpeed", videoSpeed);
          divSpeedCounter.innerHTML = videoSpeed;
          break;
        default:
          return;
      }

      localStorage.setItem("statusKeyBordControl", statusKeyBordControl);
    }
  })();
}
