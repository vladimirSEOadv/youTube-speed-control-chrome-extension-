function keyboardControl() {
  console.log("keyBordControlFunc on");
  document.addEventListener("keydown", keyBordHandler);
  let statusKeyBordControl =
    localStorage.getItem("statusKeyBordControl") != null
      ? localStorage.getItem("statusKeyBordControl")
      : false;

  function keyBordHandler(e) {
    if (e.code === "NumLock") {
      statusKeyBordControl = !statusKeyBordControl;
      return;
    } else if (!statusKeyBordControl) {
      return;
    }

    // Функция для округления x - число, n - количество знаков
    function roundPlus(x, n) {
      if (isNaN(x) || isNaN(n)) return false;
      const m = Math.pow(10, n);
      return Math.round(x * m) / m;
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

    localStorage.setItem("statusKeyBordControl", statusKeyBordControl);
  }
}
