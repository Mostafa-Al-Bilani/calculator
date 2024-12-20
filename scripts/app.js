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
  .querySelectorAll(".button")
  .forEach((elem) => elem.addEventListener("click", blink));

document.getElementById("=").addEventListener("click", equalClick);

document
  .getElementById("toggle-post-pre")
  .addEventListener("change", toggleModeClick);

document
  .getElementById("toggle-theme-mode")
  .addEventListener("change", toggleThemeMode);

document.getElementById("close").addEventListener("click", closeButton);

document.getElementById("open").addEventListener("click", openButton);

// opens the tutorial pop-up
function openButton() {
  document.getElementById("tutorial").style.display = "flex";
}

// closes the tutorial pop-up
function closeButton() {
  document.getElementById("tutorial").style.display = "none";
}

// add a color effect when clicking a button
function blink() {
  const blinked = this.id;
  const blink_color = document.getElementById(blinked);

  blink_color.classList.add("blink");

  // remove the blink class after 200ms
  setTimeout(() => {
    blink_color.classList.remove("blink");
  }, 200);
}

// appends a new text to the screen
function display(value) {
  const screen = document.getElementById("display");
  const intial_value = screen.innerHTML;

  screen.innerHTML = intial_value + value;
}

// shows final result on the screen
function displayResult(result) {
  const screen = document.getElementById("display");
  screen.innerHTML = result;
}

// resets everything(the displayed screen, the memory and the result)
function clear() {
  memory = [];
  temp_number = "";
  const screen = document.getElementById("display");
  screen.innerHTML = "";
  is_showing_results = false;
}

// changes between modes : postfix - prefix
function toggleModeClick() {
  is_postfix = !is_postfix;

  // we clear everything after changing modes since each mode has different rules
  clear();
}

// changes between themes : dark mode - light mode
function toggleThemeMode() {
  is_darkmode = !is_darkmode;
  if (is_darkmode) {
    document.getElementById("calculator").classList.remove("light");
  } else {
    document.getElementById("calculator").classList.add("light");
  }
}

function numberClick() {
  // if there is a result and a number is pressed we clear everything
  if (is_showing_results) {
    clear();
  }
  // condition for prefixmode: can't start with a number
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
  // postfix condition: can't input an operator unless there is 2 numbers before it
  if (is_postfix && memory.length < 2) {
    return;
  }
  // can't enter an operator while temp number is still not pushed into memory
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
    // if temp_number is not empty and enter is clicked
    if (temp_number != "") {
      // we push emp_number into memory after chaning it into a float
      memory.push({ value: parseFloat(temp_number), type: "number" });
      // we update temp_number to empty
      temp_number = "";
      const screen = document.getElementById("display");
      // we add a space between the list items for display purposes
      screen.innerHTML += " ";
    }
  } else if (clicked == "delete") {
    // if there is no memory and the value of temp_number is empty there no need for delete
    if (memory.length == 0 && temp_number == "") {
      return;
    }
    // if temp_number is empty this means we have to delete the whole number from the memory
    // if temp_number is not empty then this means we can only remove from screen and not the array
    if (temp_number == "") {
      memory.pop();
      // we update the display by removing the last item while keeping the spacing
      const screen = document.getElementById("display");
      const separate_entries = screen.innerHTML.split(" ");
      separate_entries.splice(separate_entries.length - 2, 1);
      const new_display = separate_entries.join(" ");
      screen.innerHTML = new_display;
    } else {
      // we update the display by removing the last number
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
  //we loop over the memory
  for (let i = 0; i < memory.length; i++) {
    // we then check the type of each value
    const type = memory[i].type;
    const value = memory[i].value;

    if (type == "number") {
      // if it's a number we push into postfix_stack
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
  // finally it returns the last remaining number after the loop is finished
  return postfix_stack[0];
}

function evaluatePreFix() {
  const prefix_stack = [];
  //we loop over the memory of values from right to left
  for (let i = memory.length - 1; i >= 0; i--) {
    // we then the check type of each value
    const type = memory[i].type;
    const value = memory[i].value;

    if (type == "number") {
      // if it's a number we push into prefix_stack
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
  // finally it returns the last remaining number after the loop is finished
  return prefix_stack[0];
}

function equalClick() {
  // the count operators have to be less than the count numbers by 1
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
