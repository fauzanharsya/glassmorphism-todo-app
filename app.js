const form = document.querySelector('#new-to-do');
const input = document.querySelector('#input');
const todayTodo = document.querySelector('#today-to-do'); // UL Today
const doneTodo = document.querySelector('#done-to-do'); // UL Done
const deleteAllDoneTodoButton = document.querySelector('#delete-all-done-todo')
const body = document.body;

let todayTodos = [];
let doneTodos = [];

// function to save data to local storage
function saveTodos(){
  localStorage.setItem('todayTodos', JSON.stringify(todayTodos));
  localStorage.setItem('doneTodos', JSON.stringify(doneTodos));
  console.log('Todos saved to localStorage!');
}

// function to create li element in DOM
// this function will be used to load data and create new to do
function createTodoElement(todoText, isDone = false){
  const newTodo = document.createElement('li');
  newTodo.classList.add('has-text-black')

  const todoTextArea = document.createElement('span');
  todoTextArea.textContent = todoText;
  todoTextArea.classList.add('todo-text-area');
  newTodo.appendChild(todoTextArea);
  
  const deleteButtonSpan = document.createElement('span');
  deleteButtonSpan.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButtonSpan.classList.add('delete-button');
  newTodo.appendChild(deleteButtonSpan);

  if(isDone){ // if to do come from done list, add 'done' class
    newTodo.classList.add('done');
  }

  return newTodo;
}

function loadTodos(){

  const hasBeenUsed = localStorage.getItem('appHasBeenUsed');

  if(!hasBeenUsed){
    console.log('First time load. Creating dummy data...')

    todayTodos = ['Buy Groceries', 'Cooking'];
    doneTodos = ['Take a Shower', 'Watering Plants'];

    saveTodos();

    localStorage.setItem('appHasBeenUsed', 'true');
  } else{
    console.log("Todos loaded from localStorage!");
    const storedTodayTodos = localStorage.getItem('todayTodos');
    const storedDoneTodos = localStorage.getItem('doneTodos');

    todayTodos = JSON.parse(storedTodayTodos);
    doneTodos = JSON.parse(storedDoneTodos);
  }

   //delete everything default ul content
    todayTodo.innerHTML = '';
    doneTodo.innerHTML = '';
  
  todayTodos.forEach(todoText => {
    const li = createTodoElement(todoText, false);
    todayTodo.appendChild(li);
  });

  doneTodos.forEach(todoText => {
    const li = createTodoElement(todoText, true);
    doneTodo.appendChild(li);
  });
}

// Event listener to add new to do to the Today to do section
form.addEventListener('submit', function(e){
  e.preventDefault();

  const todoText = input.value.trim();
  
  if(todoText === ''){
    alert("To-do can't be empty!");
    input.value = '';
    return;
  }

  const newTodoElement = createTodoElement(todoText, false);
  todayTodo.appendChild(newTodoElement); // add to the dom
  todayTodos.push(todoText);

  input.value = '';
  console.log("success addding new to-do");
  saveTodos();
})

// Event delegation on Body to move to do between today to do and done to do & delete to do
// handle click LI on both list (today and done) and click on delete(trash) icon

body.addEventListener('click', e => {
  const clickedElement = e.target;

  //1. Logic to delete to-do
  const deleteButton = clickedElement.closest('.delete-button');
  if(deleteButton){
    const listItemToRemove = deleteButton.parentElement; //parent from .delete-button is LI
    if(listItemToRemove && listItemToRemove.tagName == 'LI'){
      const todoTextToRemove = listItemToRemove.querySelector('.todo-text-area').textContent.trim();
      
      if(listItemToRemove.parentElement.id === 'today-to-do'){
        todayTodos = todayTodos.filter(todo => todo !== todoTextToRemove);
      } else if(listItemToRemove.parentElement.id === 'done-to-do'){
        doneTodos = doneTodos.filter(todo => todo !== todoTextToRemove);
      }

      listItemToRemove.remove();
      console.log(`deleted: ${todoTextToRemove}`);
      saveTodos();
    }

    return;
  }

  //2. Logic to move around the to-do between today to do and done to do
  const todoTextAreaClicked = clickedElement.closest('.todo-text-area');
  if(todoTextAreaClicked){
    const listItemToMove = todoTextAreaClicked.parentElement;
    const todoTextToMove = todoTextAreaClicked.textContent.trim();

    if(listItemToMove.parentElement.id === 'today-to-do'){
      //if li clicked on today to do list
      listItemToMove.classList.add('done');
      doneTodo.appendChild(listItemToMove);

      todayTodos = todayTodos.filter(todo => todo !== todoTextToMove);
      doneTodos.push(todoTextToMove);

      console.log(`moved to done to do list: ${todoTextToMove}`);
    } else if(listItemToMove.parentElement.id === 'done-to-do'){
      //if li clicked on done to do list
      listItemToMove.classList.remove('done');
      todayTodo.appendChild(listItemToMove);

      doneTodos = doneTodos.filter(todo => todo !== todoTextToMove);
      todayTodos.push(todoTextToMove);

      console.log(`moved to today to do list: ${listItemToMove}`);
    }
    saveTodos()
  }

})

//Event listener to the delete all done to do button
deleteAllDoneTodoButton.addEventListener('click', () => {
  doneTodo.innerHTML = '';
  doneTodos = [];
  console.log("sucessfully removed");
  saveTodos();
})

document.addEventListener('DOMContentLoaded', loadTodos);
