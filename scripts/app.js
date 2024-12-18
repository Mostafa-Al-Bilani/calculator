let screen_value = [];
let have_operator = false;

function display(value) {
  const screen = document.getElementById("display");
  const intial_value = screen.innerHTML;
  screen.innerHTML = intial_value + value;
}

document
  .querySelectorAll(".number")
  .forEach((elem) => elem.addEventListener("click", numberClick));

document
  .querySelectorAll(".operator")
  .forEach((elem) => elem.addEventListener("click", operatorClick));


function numberClick() {
  const clicked = this.id;
  display(clicked);
  screen_value.push(clicked)
}

function operatorClick() {
  if (screen_value.length < 2) return;
  const clicked = this.id;
  display(clicked);
  screen_value.push(clicked);
  have_operator = true
}
function equal() {
    if(have_operator){
        let result = 0
        for(let i = 0; i < screen_value.length; i++){
            
        }
            
    }

}


