function keyboardControl() {
  document.addEventListener("keydown", keyboardHandler);
  let statusKeyboardControl =
    localStorage.getItem("statusKeyboardControl") != null
      ? localStorage.getItem("statusKeyboardControl")
      : false;

  // Функция для округления
  // Необходима для исключения багов при сложении нецелочисленных значений
  // x - число, n - количество знаков.
  function roundPlus(x, n) {
    const m = Math.pow(10, n);
    return Math.round(x * m) / m;
  }

  function keyboardHandler(e) {
    // const statusKeyboardControl = store.get(["statusKeyboardControl"])
    if (e.code === "NumLock") {
      statusKeyboardControl = !statusKeyboardControl;
    }

    if (statusKeyboardControl === false) {
      return;
    }
    switch (e.code) {
      case "KeyA":
        store
          .get(["speed"])
          .then((data) => {
            const value = Number(data.speed) - 0.1;
            return roundPlus(value, 1);
          })
          .then((numb) => set({ speed: numb }));
        break;
      case "KeyS":
        set({ speed: 1 });
        break;
      case "KeyD":
        store
          .get(["speed"])
          .then((data) => {
            const value = Number(data.speed) + 0.1;
            return roundPlus(value, 1);
          })
          .then((numb) => set({ speed: numb }));
        break;
      default:
        return;
    }

    localStorage.setItem("statusKeyboardControl", statusKeyboardControl);
  }
}
