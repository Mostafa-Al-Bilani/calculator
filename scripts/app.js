// global variables
let memory = []; // where we store all the input
let temp_number = ""; // number to be pushed into memory
let is_postfix = true;
let is_showing_results = false;
let is_darkmode = true;

// adding listeners to components
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
  .getElementById("toggle-post-pre")
  .addEventListener("change", toggleModeClick);

document.getElementById("=").addEventListener("click", equalClick);

document.getElementById("toggle-mode").addEventListener("change", toggleThemeMode);

document
  .querySelectorAll(".button")
  .forEach((elem) => elem.addEventListener("click", blink));

document.getElementById("close").addEventListener("click", closeButton);

document.getElementById("open").addEventListener("click", openButton);

function closeButton() {
  document.getElementById("tutorial").style.display = "none";
}

function openButton() {
  document.getElementById("tutorial").style.display = "flex";
}

function blink() {
  const blinked = this.id;
  const blink_color = document.getElementById(blinked);

  blink_color.classList.add("blink")

  //remove 
  setTimeout(() => {
  blink_color.classList.remove("blink")
  }, 200); 
}

function display(value) {
  const screen = document.getElementById("display");
  const intial_value = screen.innerHTML;

  screen.innerHTML = intial_value + value;
}

function displayResult(result) {
  const screen = document.getElementById("display");
  screen.innerHTML = result;
}

function clear() {
  memory = [];
  temp_number = "";
  const screen = document.getElementById("display");
  screen.innerHTML = "";
  is_showing_results = false;
}

function toggleModeClick() {
  is_postfix = !is_postfix;
  clear();
}

function toggleThemeMode() {
  is_darkmode = !is_darkmode;
  if (is_darkmode) {
    document.getElementById("calculator").classList.remove("light");
  } else {
    document.getElementById("calculator").classList.add("light");
  }
}

function numberClick() {
  if (is_showing_results) {
    clear();
  }

  if (!is_postfix && memory.length == 0) {
    return;
  }

  const clicked = this.id;
  temp_number += clicked;
  display(clicked);
}

function operatorClick() {
  if (is_showing_results) {
    clear();
  }

  if (is_postfix && memory.length < 2) {
    return;
  }

  if (temp_number != "") {
    return;
  }

  const clicked = this.id;
  display(clicked + " ");
  memory.push({ value: clicked, type: "operator" });
}

function actionClick() {
  const clicked = this.id;
  if (clicked == "enter") {
    // when enter is pressed we push the temp number into the array
    // when enter is emptyfF
    if (temp_number != "") {
      memory.push({ value: parseFloat(temp_number), type: "number" });
      temp_number = "";
      const screen = document.getElementById("display");
      screen.innerHTML += " ";
    }
  } else if (clicked == "delete") {
    if (memory.length == 0 && temp_number == "") {
      return;
    }
    // if (tempnmber ==>  empty) then I can remove last item from array and last item from diaplay
    // if temp is not empty then I can oly remove from display
    if (temp_number == "") {
      memory.pop();
      const screen = document.getElementById("display");
      const separate_entries = screen.innerHTML.split(" ");
      separate_entries.splice(separate_entries.length - 2, 1);
      const new_display = separate_entries.join(" ");
      screen.innerHTML = new_display;
    } else {
      const screen = document.getElementById("display");
      screen.innerHTML = screen.innerHTML.slice(0, -1);
      temp_number = temp_number.slice(0, -1);
    }
  } else if (clicked == "clear") {
    clear();
  }
}


function evaluatePostFix() {
  const postfix_stack = [];
  //we nee to loop over the array of values
  for (let i = 0; i < memory.length; i++) {
    // we then have to check type of each value
    const type = memory[i].type;
    const value = memory[i].value;

    if (type == "number") {
      // if it's a number we push into the stach
      postfix_stack.push(value);
    } else {
      // if it's an operator we pop the 2 numbers before it
      const num1 = postfix_stack.pop();
      const num2 = postfix_stack.pop();
      // we evaluate the numbers using the operator
      let result = 0;
      if (value == "+") {
        result = num2 + num1;
      } else if (value == "-") {
        result = num2 - num1;
      } else if (value == "*") {
        result = num2 * num1;
      } else {
        result = num2 / num1;
      }
      // we push the new number into the stack
      postfix_stack.push(result);
    }
  }
  return postfix_stack[0];
}

function evaluatePreFix() {
  const prefix_stack = [];
  //we nee to loop over the array of values from right to left
  for (let i = memory.length - 1; i >= 0; i--) {
    // we then have to check type of each value
    const type = memory[i].type;
    const value = memory[i].value;

    if (type == "number") {
      // if it's a number we push into the stach
      prefix_stack.push(value);
    } else {
      // if it's an operator we pop the 2 numbers before it
      const num1 = prefix_stack.pop();
      const num2 = prefix_stack.pop();
      // we evaluate the numbers using the operator
      let result = 0;
      if (value == "+") {
        result = num1 + num2;
      } else if (value == "-") {
        result = num1 - num2;
      } else if (value == "*") {
        result = num1 * num2;
      } else {
        result = num1 / num2;
      }
      // we push the new number into the stack
      prefix_stack.push(result);
    }
  }
  return prefix_stack[0];
}

function equalClick() {
  // the operators have to be less than the numbers by 1
  const numbers_count = memory.filter((elem) => elem.type == "number").length;
  const operators_count = memory.length - numbers_count;
  if (operators_count != numbers_count - 1) {
    return;
  }

  if (memory.length == 0) {
    console.log("if the user has not entred anything yet");
    return;
  }
  
  if (temp_number != "") {
    console.log("if the user has not pressed enter while inputing a number");
    return;
  }

  if (is_postfix && memory[memory.length - 1].type == "number") {
    console.log("it is a postfix and the last item is a number");
    return;
  }

  if (!is_postfix && memory[memory.length - 1].type == "operator") {
    console.log("it is a prefix and the last item is an operator");
    return;
  }

  if (is_postfix) {
    const result = evaluatePostFix();
    displayResult(result);
  } else {
    const result = evaluatePreFix();
    displayResult(result);
  }

  is_showing_results = true;
}

