// screen value = [{value : "+" or "*" or 12 ..., type:"number" or "operator" }]
let screen_value = [];
let temp_number = "";
let is_postfix = true;

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

document.getElementById("=").addEventListener("click", equalClick);

// document
//   .querySelectorAll(".button")
//   .forEach((elem) => elem.addEventListener("click", blink));

function display(value) {
  const screen = document.getElementById("display");
  const intial_value = screen.innerHTML;
  screen.innerHTML = intial_value + value;
}

function numberClick() {
  if (!is_postfix && screen_value.length == 0){
    return
  }
  const clicked = this.id;
  temp_number += clicked;
  display(clicked);
}

function operatorClick() {
  if ((is_postfix && screen_value.length < 2)) {
    return;
  }
  if (temp_number != "") {
    return;
  }
  const clicked = this.id;
  display(clicked + " ");
  screen_value.push({value : clicked, type : "operator"});
  console.log(screen_value)
}

function toggleClick() {
  is_postfix = !is_postfix;
  console.log("is_postfix ", is_postfix);
  clear();
}

// function blink() {
//   const blinked = this.id;
//   const blink_color = document.getElementById(blinked);
//   blink_color.style.backgroundColor = "gray";
//   setTimeout(() => {
//     blink_color.style.backgroundColor = "black";
//   }, 1000);
// }

function actionClick() {
  const clicked = this.id;
  if (clicked == "enter") {
    // when enter is pressed we push the temp number into the array
    // when enter is emptyfF
    if (temp_number != "") {
      screen_value.push({value : parseFloat(temp_number), type : "number"});
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
    clear();
  }
}

function clear() {
  screen_value = [];
  temp_number = "";
  const screen = document.getElementById("display");
  screen.innerHTML = "";
}

function equalClick() {
  if(screen_value.length == 0){
    console.log("if the user has not entred anything yet")
    return
  }
  if(temp_number != ""){
    console.log("if the use has not pressed enter while inputing a number")
    return
  }
  if(is_postfix && screen_value[screen_value.length - 1].type == "number"){
    console.log("it is a postfix and the last item is a number")
    return
  }
  if(!is_postfix && screen_value[screen_value.length - 1].type == "operator"){
    console.log("it is a prefix and the last item is an operator")
    return
  }
}







  // const clicked = this.id
  // if (clicked == "="){
  // for (value of screen_value){
  //   if (isNaN(value)) {
  //     let x = screen_value.pop()
  //     let y = screen.value.pop()
  //     if (value == "+")
  //     } else if (value == '-'){
  //       stack.push(y - x);
  //   } else if (value == '*'){
  //       stack.push(y * x);
  //   } else if (value == '/'){
  //       stack.push(y / x);
  //   }else {
  //     screen_value.push( parseFloat(value) );
  //   }
  //   }

  // }
  // 
