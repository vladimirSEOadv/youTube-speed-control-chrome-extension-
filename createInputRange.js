function createInputRange() {
  const container = document.createElement("div");
  Object.assign(container.style, {
    width: "200px",
    border: "1px solid #bab1b1",
    borderRadius: "10px",
    padding: "5px",
  });

  const inputRange = document.createElement("input");
  inputRange.type = "range";
  inputRange.min = "1";
  inputRange.max = "5";
  inputRange.value = "5";
  inputRange.step = "0.10";
  inputRange.id = "range-input";
  inputRange.setAttribute("list", "values");

  Object.assign(inputRange.style, {
    width: "100%",
    margin: "0",
  });

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
  // Delete listener
  inputRange.addEventListener("click", (e) => {
    console.log(e.target.value);
  });

  container.appendChild(inputRange);
  container.appendChild(datalist);

  return container;
}
