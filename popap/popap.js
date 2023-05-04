const speedInput = document.getElementById("input-speed");
const qualitySelect = document.getElementById("quality-select");
const subtitleInput = document.getElementById("subtitle-checkbox");
const translationSelect = document.getElementById("translation-select");
const mouseLeaveCheckbox = document.getElementById("mouse-leave-checkbox");
const store = chrome.storage.local;

async function set(obj) {
  await store.set(obj);
}

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
})();

[speedInput, qualitySelect, subtitleInput, translationSelect].forEach((item) =>
  item.addEventListener("change", handleInput)
);

function handleInput(e) {
  if (e.target === speedInput) {
    const newValue = e.target.value || 1;
    set({ speed: newValue });
  } else if (e.target === qualitySelect) {
    const qualityValue =
      qualitySelect.options[qualitySelect.selectedIndex].value;
    set({ quality: qualityValue });
  } else if (e.target === subtitleInput) {
    set({ subtitleStatus: e.target.checked });
  } else if (e.target === translationSelect) {
    const translationValue =
      translationSelect.options[translationSelect.selectedIndex].value;
    set({ translationLang: translationValue });
  } else {
    console.log(`Обработчик для ${e.target} не определен`);
  }
}

function handeleChangeStore(changes) {
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
      default:
        console.log("unknown key in handeleChangeStore", key);
        break;
    }
  }
}

store.onChanged.addListener(handeleChangeStore);
