const form = document.querySelector('#new-to-do');
const input = document.querySelector('#input');
const todayTodo = document.querySelector('#today-to-do'); // UL Today
const doneTodo = document.querySelector('#done-to-do'); // UL Done
const deleteAllDoneTodoButton = document.querySelector('#delete-all-done-todo')
const body = document.body;

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
  
  const deleteButtonSpan = document.createElement('span');
  deleteButtonSpan.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButtonSpan.classList.add('delete-button');
  newTodo.appendChild(deleteButtonSpan);

  todayTodo.appendChild(newTodo);
  input.value = '';
  console.log("success addding new to-do");
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
      listItemToRemove.remove();
      const originalText = listItemToRemove.textContent.replace(deleteButton.textContent, '').trim();
      console.log(`deleted: ${originalText}`);
    }
    return;
  }

  //2. Logic to move around the to-do between today to do and done to do
  if(clickedElement.tagName === 'LI'){
    if(clickedElement.parentElement.id === 'today-to-do'){
      //if li clicked on today to do list
      clickedElement.classList.add('done');
      doneTodo.appendChild(clickedElement);
      console.log(`moved to done to do list: ${clickedElement.textContent.trim()}`);
    } else if(clickedElement.parentElement.id === 'done-to-do'){
      //if li clicked on done to do list
      clickedElement.classList.remove('done');
      todayTodo.appendChild(clickedElement);
      console.log(`moved to today to do list: ${clickedElement.textContent.trim()}`);
    }
  }

})

//Event listener to the delete all done to do button
deleteAllDoneTodoButton.addEventListener('click', () => {
  doneTodo.innerHTML = '';
  console.log("sucessfully removed");
})

