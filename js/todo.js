const toDoForm = document.querySelector("#todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.querySelector("#todo-list");

const TODOS_KEY = "todos";

const BUTTON_NAME = "button-name";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text; //newTodoObj라는 객체를 넘겨주니까 화면상 text만 출력하기위해 .text를 붙임
    const button = document.createElement("button");
    button.className = BUTTON_NAME;
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span); //li 내부에 span태그를 넣어서 생성
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) { //여기서 event는 addEventListener의 이벤트에 대한 정보를 넘겨줌
    event.preventDefault();
    const newTodo = toDoInput.value; //newTodo라는 새로운 변수에 인풋값을 저장했기 때문에 그 뒤에 인풋 값을 "" 로 비운다고 저장된 값을 지우는건 아님
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); //새로고침을 해도 계속 각각을 페인트하니까 화면에 계속 나옴
}