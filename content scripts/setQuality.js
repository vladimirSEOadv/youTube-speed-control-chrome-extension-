// Установить качество видео на выбранное

// function waitSelector(startSelector, targetSelector) {
//   const interval = setInterval(function () {
//     const selector = startSelector.querySelector(targetSelector);
//     if (selector) {
//       clearInterval(interval);
//       return selector;
//     }
//   }, 1000);
// }

function changeQuality(arrOfElements, requiredValue) {
  const maxQuality = arrOfElements[0];
  const auto = arrOfElements[arrOfElements.length - 1];
  if (requiredValue === "max") {
    maxQuality.click();
    return;
  }
  if (requiredValue === "auto") {
    auto.click();
    return;
  }
  let element = null;
  let index = 0;
  while (index < arrOfElements.length && !element) {
    const currentEl = arrOfElements[index];
    if (currentEl.innerText === requiredValue) {
      element = currentEl;
    }
    index++;
  }
  if (element) {
    element.click();
  } else {
    maxQuality.click();
  }
}

function setQuality(quality) {
  // Найти кнопку настройки качества видео
  const settingsButton = document.querySelector(".ytp-settings-button");
  if (settingsButton) {
    // Открыть меню настройки качества видео
    settingsButton.click();
    // Найти элемент c текстом "Качество"
    const popap = document.querySelector(".ytp-settings-menu");
    const qualityLabel = [
      ...popap.querySelectorAll(".ytp-menuitem-label"),
    ].find((label) => label.innerText === "Качество");

    if (qualityLabel) {
      qualityLabel.click(); // После этого попап обновляется
      let waitQualityButton = setInterval(function () {
        const options = document.querySelectorAll(".ytp-menuitem"); // получить список опций
        changeQuality(options, quality);
        clearInterval(waitQualityButton);
      }, 500);
    }
  }
}
// setQuality('max')
// 2160p 4K
// 1440p HD
// 1080p HD
// 720p
// 480p
// 360p
// 240p
// 144p
// Автонастройка
