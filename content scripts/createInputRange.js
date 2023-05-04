function createInputRange(rangeType = "inner") {
  const container = document.createElement("div");
  Object.assign(container.style, {
    width: "200px",
    padding: "5px",
    // border: "1px solid #bab1b1",
    // borderRadius: "10px",
  });

  const inputRange = document.createElement("input");
  inputRange.type = "range";
  inputRange.min = "1";
  inputRange.max = "5";
  inputRange.value = "1";
  inputRange.step = "0.10";
  inputRange.id =
    rangeType === "external" ? "external-range-input" : "inner-range-input";

  Object.assign(inputRange.style, {
    width: "100%",
    margin: "0",
  });

  if (rangeType === "external") {
    inputRange.setAttribute("list", "values");
    const datalist = document.createElement("datalist");
    datalist.id = "values";
    Object.assign(datalist.style, {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      marginTop: "-7px",
    });

    for (let index = 1; index < 6; index++) {
      const datalistOption = document.createElement("option");
      datalistOption.value = `${index}.00`;
      datalistOption.label = `${index}`;
      Object.assign(datalistOption.style, {
        marginRight: "5px",
        fontSize: "20px",
        backgroundColor: "white",
      });
      datalist.appendChild(datalistOption);
    }
    container.appendChild(datalist);
  }

  // Delete listener
  inputRange.addEventListener("click", (e) => {
    console.log("target ", e.target, "value ", e.target.value);
  });

  container.prepend(inputRange);

  return container;
}
