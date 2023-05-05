function keyboardControl() {
  document.addEventListener("keydown", keyboardHandler);

  // Функция для округления
  // Необходима для исключения багов при сложении нецелочисленных значений
  // x - число, n - количество знаков.
  function roundPlus(x, n) {
    const m = Math.pow(10, n);
    return Math.round(x * m) / m;
  }

  //increase decrease normal
  async function updateSpeed(operator = "increase") {
    if (operator === "normal") set({ speed: 1 });
    const currentSpeedObj = await store.get(["speed"]);
    const currentSpeedValue = Number(currentSpeedObj.speed);
    const newSpeed =
      operator === "increase"
        ? currentSpeedValue + 0.1
        : currentSpeedValue - 0.1;
    const rounded = roundPlus(newSpeed, 1);
    await set({ speed: rounded });
  }

  async function changeStatus(status) {
    const newStatus = !status;
    await set({ statusKeyboardControl: newStatus });
  }

  async function getStatus() {
    const current = await store.get(["statusKeyboardControl"]);
    console.log("getStatus:current ", current);
    if (current === null) return false;
    return await current.statusKeyboardControl;
  }

  async function keyboardHandler(e) {
    const currentStatus = await getStatus();
    if (e.code === "NumLock") {
      await changeStatus(currentStatus);
    }
    if (currentStatus === false) {
      return;
    }
    switch (e.code) {
      case "KeyA":
        await updateSpeed("decrise");
        break;
      case "KeyS":
        await updateSpeed("normal");
        break;
      case "KeyD":
        await updateSpeed("increase");
        break;
      default:
        return;
    }
  }
}
