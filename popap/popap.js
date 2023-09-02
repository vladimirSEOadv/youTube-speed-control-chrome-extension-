const speedInput = document.getElementById("input-speed");
const qualitySelect = document.getElementById("quality-select");
const subtitleInput = document.getElementById("subtitle-checkbox");
const translationSelect = document.getElementById("translation-select");
const mouseLeaveCheckbox = document.getElementById("mouse-leave-checkbox");
const store = chrome.storage.local;

async function set(obj) {
  await store.set(obj);
}

// Инициализация начальных значений. Ищет в local store значения, если не находит задает значения по умолчанию.
(function initValues() {
  store.get(["speed"]).then((data) => {
    speedInput.value = Number(data.speed) || 1;
  });
  store.get(["quality"]).then((data) => {
    qualitySelect.value = data?.quality || "max";
  });
  store.get(["subtitleStatus"]).then((data) => {
    subtitleInput.checked = Boolean(data.subtitleStatus);
  });
  store.get(["translationLang"]).then((data) => {
    translationSelect.value = data.translationLang || "ru";
  });
  store.get(["pauseOnMouseLeave"]).then((data) => {
    console.log("data.pauseOnMouseLeave", data.pauseOnMouseLeave);
    mouseLeaveCheckbox.checked = Boolean(data.pauseOnMouseLeave);
  });
})();

[
  speedInput,
  qualitySelect,
  subtitleInput,
  translationSelect,
  mouseLeaveCheckbox,
].forEach((item) => item.addEventListener("change", handleInput));

// Функция для переноса изменений значений html в localStore
function handleInput(e) {
  switch (e.target) {
    case speedInput:
      const newValue = e.target.value || 1;
      set({ speed: newValue });
      break;
    case qualitySelect:
      const qualityValue =
        qualitySelect.options[qualitySelect.selectedIndex].value;
      set({ quality: qualityValue });
      break;
    case subtitleInput:
      set({ subtitleStatus: e.target.checked });
      break;
    case translationSelect:
      const translationValue =
        translationSelect.options[translationSelect.selectedIndex].value;
      set({ translationLang: translationValue });
      break;
    case mouseLeaveCheckbox:
      set({ pauseOnMouseLeave: e.target.checked });
      break;
    default:
      console.log(`Обработчик для ${e.target} не определен`);
      return;
  }
}

// Функция для синхронизации значений стора и html страницы popap
function handleChangeStore(changes) {
  console.log(changes);
  for (let key in changes) {
    switch (key) {
      case "speed":
        speedInput.value = changes.speed.newValue;
        break;
      case "quality":
        qualitySelect.value = changes.quality.newValue;
        break;
      case "subtitleStatus":
        subtitleInput.checked = changes.subtitleStatus.newValue;
        break;
      case "translationLang":
        translationSelect.value = changes.translationLang.newValue;
        break;
      case "pauseOnMouseLeave":
        mouseLeaveCheckbox.checked = changes.pauseOnMouseLeave.newValue;
        break;
      default:
        console.log("unknown key in handeleChangeStore", key);
        break;
    }
  }
}

store.onChanged.addListener(handleChangeStore);
