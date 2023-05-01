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

  const ELEMENTIDFORINSERT = "limited-state"; // Элемент-контейнер для вставки

  // Создание элементов интерфейса
  const divSpeedCounter = document.createElement("div");
  Object.assign(divSpeedCounter.style, {
    marginLeft: "90px",
    fontSize: "30px",
  });

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
        divSpeedCounter.textContent = newSpeed;
        document
          .getElementById(ELEMENTIDFORINSERT)
          .appendChild(divSpeedCounter);
      });
  })();

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
    document.getElementById(ELEMENTIDFORINSERT).appendChild(element);
    return element;
  }

  // Функция для изменения скорости
  function changeSpeed(changeType) {
    if (changeType === "normal") {
      set({ speed: 1 });
      return;
    }
    store
      .get(["speed"])
      .then((data) => {
        const currentSpeed = Number(data.speed);
        if (changeType === "increase") {
          return currentSpeed + 0.25;
        }
        if (changeType === "decrease") {
          return currentSpeed - 0.25;
        }
      })
      .then((numb) => set({ speed: numb }));
  }

  // Обработчик событий кликов
  document
    .getElementById(ELEMENTIDFORINSERT)
    .addEventListener("click", async (event) => {
      if (event.target.id === "fast-button") {
        changeSpeed("increase");
      } else if (event.target.id === "normal-button") {
        changeSpeed("normal");
      } else if (event.target.id === "slow-button") {
        changeSpeed("decrease");
      }
    });

  elementCreator("button", "red", "slow", "slow-button");
  elementCreator("button", "black", "normal", "normal-button");
  elementCreator("button", "green", "fast", "fast-button");

  function handelerChangeStore(changes) {
    console.log("changes", changes);
    for (let key in changes) {
      switch (key) {
        case "speed":
          divSpeedCounter.innerHTML = Number(changes.speed.newValue);
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
          console.log("unknown key in handeleChangeStore", key);
          break;
      }
    }
  }

  store.onChanged.addListener(handelerChangeStore);

  // Функция для управления с клавиатуры
  keyboardControl();
}
