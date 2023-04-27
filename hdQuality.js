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
