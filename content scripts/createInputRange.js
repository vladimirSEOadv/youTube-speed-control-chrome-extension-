function createInputRange(rangeType = "inner") {
  const container = document.createElement("div");
  container.classList.add("range-container");
  container.classList.add(
    rangeType === "external"
      ? "external-range-container"
      : "inner-range-container"
  );

  const inputRange = document.createElement("input");
  inputRange.classList.add("range-container__input-range");
  inputRange.type = "range";
  inputRange.min = "1";
  inputRange.max = "5";
  inputRange.value = "1";
  inputRange.step = "0.10";
  inputRange.id =
    rangeType === "external" ? "external-range-input" : "inner-range-input";

  if (rangeType === "external") {
    inputRange.setAttribute("list", "values");
    const datalist = document.createElement("datalist");
    datalist.classList.add("range-container__datalist", "datalist");
    datalist.id = "values";

    for (let index = 1; index < 6; index++) {
      const datalistOption = document.createElement("option");
      datalistOption.classList.add("datalist__option");
      datalistOption.value = `${index}.00`;
      datalistOption.label = `${index}`;
      datalist.appendChild(datalistOption);
    }
    container.appendChild(datalist);
  }

  container.prepend(inputRange);

  return [container, inputRange];
}
