function setSubtitleStatus(status = "on") {
  const targetStatus = status === "on";
  const subtitlesIcon = getSubtitleIconNode();
  const availabilityStatus = checkSubtitleAvailability();
  if (!availabilityStatus) {
    console.warn("Субтитры для этого видео недоступны");
  } // Если субтитры недоступны, завершение функции

  const currentStatus = subtitlesIcon.getAttribute("aria-pressed") === "true";
  if (currentStatus !== targetStatus) {
    subtitlesIcon.click(); // Включить/выключить субтитры в зависимости от текущего состояния и переданного status
  }
}

function getSubtitleIconNode() {
  return document.querySelector(".ytp-subtitles-button");
}

function checkSubtitleAvailability() {
  return (
    getSubtitleIconNode().getAttribute("data-title-no-tooltip") !==
    "Субтитры недоступны"
  );
}

// Change subtitle translation language
function setSubtitleTranslationLanguage(language = "Русский") {
  if (!checkSubtitleAvailability()) return;
  // Найти кнопку настройки качества видео
  const settingsButton = document.querySelector(".ytp-settings-button");
  // Кликнуть по ней
  settingsButton.click();
  // Получить окно попапа
  let popap = document.querySelector(".ytp-panel-menu"); //.style-scope
  const subtitlesInMenuLabel = [...popap.querySelectorAll("span")].find(
    (label) => label.innerText === "Субтитры"
  );
  subtitlesInMenuLabel.click();

  // Нужна задержка, popap должен успеть обновиться
  setTimeout(() => {
    try {
      popap = document.querySelector(".ytp-panel-menu"); //.style-scope
      const nodes = popap.querySelectorAll(".ytp-menuitem-label");
      const translateSubtitlesLabel = Array.from(nodes).find(
        (label) => label.innerText === "Перевести"
      );
      translateSubtitlesLabel?.click();
    } catch (error) {
      console.log("Error of find button `Перевести`", error);
    }
  }, 2000);
  // Нужна задержка, popap должен успеть обновиться
  setTimeout(() => {
    try {
      popap = document.querySelector(".ytp-panel-menu"); //.style-scope
      const lengNodes = popap.querySelectorAll(".ytp-menuitem-label");
      const subtitlesLabel = Array.from(lengNodes).find(
        (item) => item.innerText === language
      );
      subtitlesLabel?.click();
    } catch (error) {
      console.log("Error of find lang label", error);
    }
  }, 3000);

  document.querySelector("h1").click();
}
