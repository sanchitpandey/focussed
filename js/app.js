var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");
var liNum = 0;
var todos = [];
var newTodos = [];
var secret = "$1wKp0@";

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

function getLocal() {
  if (localStorage.getItem("todo") != null) {
    var newTodo = localStorage.getItem("todo").split(secret);
    newTodo.length = newTodo.length - 1;
  } else {
    var newTodo = [];
  }

  return newTodo;
}
newTodos = getLocal();
newTodos.forEach((y) => {
  createListElement(y);
});

function setLocal() {
  var string = "";
  todos.forEach((x) => {
    string += x.innerText.split("\n")[0] + secret;
  });
  localStorage.setItem("todo", string);
}

function createListElement(text) {
  liNum++;
  var li = document.createElement("li"); // creates an element "li"
  li.appendChild(document.createTextNode(text)); //makes text from input field the li text
  var pointer = ul.appendChild(li); //adds li to ul
  todos.push(pointer);
  setLocal();

  //START STRIKETHROUGH
  // because it's in the function, it only adds it for new items
  function crossOut() {
    li.classList.toggle("done");
  }

  li.addEventListener("click", crossOut);
  //END STRIKETHROUGH

  // START ADD DELETE BUTTON
  var dBtn = document.createElement("button");
  dBtn.appendChild(document.createTextNode("X"));
  li.appendChild(dBtn);
  dBtn.addEventListener("click", deleteListItem);
  // END ADD DELETE BUTTON

  //ADD CLASS DELETE (DISPLAY: NONE)
  function deleteListItem(e) {
    for (var i = 0; i < todos.length; i++) {
      if (todos[i] === e.path[1]) {
        todos.splice(i, 1);
      }
    }
    liNum--;
    li.classList.add("delete");
    setLocal();
  }
  //END ADD CLASS DELETE
}

function addListAfterClick() {
  if (inputLength() > 0 && liNum < 6) {
    //makes sure that an empty input field doesn't create a li
    createListElement();
    createListElement(input.value);
    input.value = "";
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13 && liNum < 6) {
    //this now looks to see if you hit "enter"/"return"
    //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
    createListElement(input.value);
    input.value = "";
  }
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);
