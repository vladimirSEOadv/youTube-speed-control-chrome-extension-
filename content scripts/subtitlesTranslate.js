// function waitSelector(startSelector, targetSelector) {
//   const interval = setInterval(function () {
//     const selector = startSelector.querySelector(targetSelector);
//     if (selector) {
//       clearInterval(interval);
//       return selector;
//     }
//   }, 1000);
// }

function setSubtitleStatus(status = "on") {
  const targetStatus = status === "on";
  const subtitlesIcon = document.querySelector(".ytp-subtitles-button");
  const subtitlesNotAvailable =
    subtitlesIcon.getAttribute("data-title-no-tooltip") ===
    "Субтитры недоступны";
  if (subtitlesNotAvailable) {
    console.log("Субтитры недоступны");
    return false;
  } // Если субтитры недоступны, завершение функции

  const currentStatus = subtitlesIcon.getAttribute("aria-pressed") === "true";
  if (currentStatus !== targetStatus) {
    subtitlesIcon.click(); // Включить/выключить субтитры в зависимости от текущего состояния и переданного status
  }
}

// Change subtitle translation language
function setSubtitleTranslationLanguage(language = "Русский") {
  if (setSubtitleStatus()) {
    return;
  }
  //   // Найти кнопку настройки качества видео
  const settingsButton = document.querySelector(".ytp-settings-button");
  // Кликнуть по ней
  settingsButton.click();
  // Получить окно попапа
  let popap = document.querySelector(".ytp-panel-menu,style-scope");
  const subtitlesInMenuLabel = [...popap.querySelectorAll("span")].find(
    (label) => label.innerText === "Субтитры"
  );
  subtitlesInMenuLabel.click();
  // Нужна задержка, popap должен успеть обновиться
  setTimeout(() => {
    popap = document.querySelector(".ytp-panel-menu,style-scope");
    const translateSubtitlesLabel = [
      ...popap.querySelectorAll(".ytp-menuitem-label"),
    ].find((label) => label.innerText === "Перевести");
    translateSubtitlesLabel.click();
  }, 2000);
  // Нужна задержка, popap должен успеть обновиться
  setTimeout(() => {
    popap = document.querySelector(".ytp-panel-menu,style-scope");
    const subtitlesLabel = [
      ...popap.querySelectorAll(".ytp-menuitem-label"),
    ].find((label) => label.innerText === language);
    subtitlesLabel?.click();
  }, 3000);
}
