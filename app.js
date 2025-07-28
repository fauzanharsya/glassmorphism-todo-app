const form = document.querySelector('#new-to-do');
const input = document.querySelector('#input');
const todayTodo = document.querySelector('#today-to-do');
const body = document.body;
const lisTodayTodo = document.querySelectorAll('#today-to-do li');
const doneTodo = document.querySelector('#done-to-do');
const lisDoneTodo = document.querySelectorAll('#done-to-do li');
const deleteAllDoneTodoButton = document.querySelector('#delete-all-done-todo')

// body.addEventListener('click', function(e){
//   e.stopPropagation();
// })

// Event listener to add new to do to the Today to do section
form.addEventListener('submit', function(e){
  e.preventDefault();

  const todoText = input.value.trim();
  
  if(todoText === ''){
    alert("To-do can't be empty!");
    input.value = '';
    return;
  }

  const newTodo = document.createElement('li');
  newTodo.textContent = todoText;
  
  const deleteButton = document.createElement('span');
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.classList.add('delete-button');
  newTodo.appendChild(deleteButton);

  todayTodo.appendChild(newTodo);
  input.value = '';
  console.log("success addding new to-do");
})

// event listener to move today to do to the done to do section
// lisTodayTodo.forEach(li => {
//   li.addEventListener('click', () => {
//     console.log(`clicked ${li.textContent}`);
//     li.classList.add('done');
//     doneTodo.appendChild(li);
//   })
// })

//Event delegation from above (event listener to move today to do to the done to do section)
todayTodo.addEventListener('click', e => {
  const clickedElement = e.target;
  if(clickedElement.tagName === 'LI' && !clickedElement.classList.contains('delete-button') && !clickedElement.closest('.delete-button')){
     console.log(`clicked ${clickedElement.textContent}`);
     clickedElement.classList.add('done');
     doneTodo.appendChild(clickedElement);
  }

  const deleteButton = clickedElement.closest('.delete-button');
  if(deleteButton){
    deleteButton.parentElement.remove();
    console.log(`deleted: ${deleteButton.parentElement.textContent.trim()}`);
    return;
  }
})

// event listener to move done to do to the today to do section / undo done to do
// lisDoneTodo.forEach(li=>{
//   li.addEventListener('click', () => {
//     li.classList.remove('done');
//     todayTodo.appendChild(li);
//   })
// })

// Event delegation from above (event listener to move done to do to the today to do section / undo done to do)
doneTodo.addEventListener('click', e => {
  const clickedElement = e.target;
  if(clickedElement.tagName === 'LI' && !clickedElement.classList.contains('delete-button') && !clickedElement.closest('.delete-button')){
     console.log(`clicked ${clickedElement.textContent}`);
     clickedElement.classList.remove('done');
     todayTodo.appendChild(clickedElement);
    }

  const deleteButton = clickedElement.closest('.delete-button');
   if(deleteButton){
    deleteButton.parentElement.remove();
    console.log(`deleted: ${deleteButton.parentElement.textContent.trim()}`);
    return;
  }
})

//Event listener to the delete all done to do button
deleteAllDoneTodoButton.addEventListener('click', () => {
  doneTodo.innerHTML = '';
  console.log("sucessfully removed");
})

