function keyboardControl() {
  console.log("keyBordControlFunc on");
  document.addEventListener("keydown", keyboardHandler);
  let statusKeyboardControl =
    localStorage.getItem("statusKeyboardControl") != null
      ? localStorage.getItem("statusKeyboardControl")
      : false;

  function keyboardHandler(e) {
    // Функция для округления x - число, n - количество знаков. Необходима для исключения багов при сложении нецелочисленных значений
    function roundPlus(x, n) {
      const m = Math.pow(10, n);
      return Math.round(x * m) / m;
    }

    switch (e.code) {
      case "NumLock":
        statusKeyboardControl = !statusKeyboardControl;
        break;
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
