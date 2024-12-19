let screen_value = [];
let temp_number = "";

document
  .querySelectorAll(".number")
  .forEach((elem) => elem.addEventListener("click", numberClick));

document
  .querySelectorAll(".operator")
  .forEach((elem) => elem.addEventListener("click", operatorClick));

document
  .querySelectorAll(".action")
  .forEach((elem) => elem.addEventListener("click", actionClick));

document
  .querySelectorAll(".switch")
  .forEach((elem) => elem.addEventListener("click", toggleClick));

function display(value) {
  const screen = document.getElementById("display");
  const intial_value = screen.innerHTML;
  screen.innerHTML = intial_value + value;
}

function numberClick() {
  const clicked = this.id;
  temp_number += clicked;
  console.log(temp_number);
  display(clicked);
}

function operatorClick() {
  // if (screen_value.length < 2) return; for postfix
  if (temp_number != "") {
    return;
  }
  const clicked = this.id;
  display(clicked + " ");
  screen_value.push(clicked);
}

function toggleClick() {
  screen_value = [];
    temp_number = "";
    const screen = document.getElementById("display");
    screen.innerHTML = ""
}

function actionClick() {
  const clicked = this.id;
  if (clicked == "enter") {
    // when enter is pressed we push the temp number into the array
    // when enter is empty
    if (temp_number != "") {
      screen_value.push(temp_number);
      temp_number = "";
      const screen = document.getElementById("display");
      screen.innerHTML += " ";
    }
    console.log(screen_value);
  } else if (clicked == "delete") {
    if (screen_value.length == 0) {
      return;
    }
    // if (tempnmber ==>  empty) then I can remove last item from array and last item from diaplay
    // if temp is not empty then I can oly remove from display
    if (temp_number == "") {
      screen_value.pop();
      const screen = document.getElementById("display");
      const separate_entries = screen.innerHTML.split(" ");
      console.log("old", separate_entries);
      separate_entries.splice(separate_entries.length - 2, 1);
      console.log("new", separate_entries);
      const new_display = separate_entries.join(" ");
      screen.innerHTML = new_display;
    } else {
      const screen = document.getElementById("display");
      screen.innerHTML = screen.innerHTML.slice(0, -1);
      temp_number = temp_number.slice(0, -1);
    }
  } else if (clicked == "clear") {
    screen_value = [];
    temp_number = "";
    const screen = document.getElementById("display");
    screen.innerHTML = "";
  }
}

function equal() {}
