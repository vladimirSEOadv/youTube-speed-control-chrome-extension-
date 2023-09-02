// Функция для постановки видео на паузу при отводе мышки
// TODO найти способ убирать навешанные слушатели handlerPlay и handlerPause
function setPauseOnMouseLeave(vid, command = "remove") {
  const handlerPlay = () => vid.play();

  const handlerPause = () => vid.pause();

  const action = command === "add" ? "addEventListener" : "removeEventListener";
  vid[action]("mouseover", handlerPlay);
  vid[action]("mouseleave", handlerPause);
}
