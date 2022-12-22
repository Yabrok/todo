const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elAddBtn = document.querySelector('.js-addBtn');
const elList = document.querySelector('.js-list');

const btnBox = document.querySelector('.js-btnbox');
const allBtn = document.querySelector('.js-allbtn');
const allBtnText = document.querySelector('.js-allbtntext');
const compleatedBtn = document.querySelector('.js-completed');
const compleatedText = document.querySelector('.compleatedtext');
const uncompleatedBtn = document.querySelector('.js-uncompleated');
const uncompleatedText = document.querySelector('.uncompleatedtext');

const todos = [];
function render(array, node) {
  node.innerHTML = ''
  array.forEach((item) => {
    let newItem = document.createElement('li');
    newItem.classList.add('list-group-item', 'd-flex', 'align-items-center');

    let newInput = document.createElement('input');
    newInput.type = 'checkbox';
    newInput.classList.add('form-check-input', 'm-0', 'js-check');
    newInput.dataset.todoId = item.id;

    let newSpan = document.createElement('span');
    newSpan.classList.add('flex-grow-1', 'mx-3');
    newSpan.textContent = item.text;

    let newEditBtn = document.createElement('button');
    newEditBtn.classList.add('me-2', 'btn', 'bg-warning', 'text-white', 'js-editbtn');
    newEditBtn.textContent = 'Edit';
    newEditBtn.dataset.todoId = item.id;


    let newDelBtn = document.createElement('button');
    newDelBtn.classList.add('btn', 'bg-danger', 'text-white', 'js-delbtn');
    newDelBtn.textContent = 'Delete';
    newDelBtn.dataset.todoId = item.id;

    newItem.appendChild(newInput);
    newItem.appendChild(newSpan);
    newItem.appendChild(newEditBtn);
    newItem.appendChild(newDelBtn);

    if (item.isCompleated) {
      newInput.checked = true;
      newSpan.style.textDecoration = 'line-through'
    };

    node.appendChild(newItem);
  })
};







// ==============================================
elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let obj = {
    id: todos.length + 1,
    text: elInput.value,
    isCompleated: false,
  };
  todos.push(obj);
  allBtnText.textContent = `(${todos.length})`;
  uncompleatedText.textContent = `(${todos.length})`;
  elInput.value = '';
  render(todos, elList);

});
// ===================================================

btnBox.addEventListener('click', (evt) => {

  if (evt.target.matches('.js-completed')) {
    const filteredTodo = todos.filter((item) => {
      return item.isCompleated == true;
    })
    compleatedText.textContent = `(${filteredTodo.length})`;
    render(filteredTodo, elList)
  };

  if (evt.target.matches('.js-uncompleated')) {
    const filteredTodo = todos.filter((item) => {
      return item.isCompleated == false;
    });
    uncompleatedText.textContent = `(${filteredTodo.length})`

    render(filteredTodo, elList);
  };

  if (evt.target.matches('.js-allbtn')) {
    render(todos, elList);
  }

})

let comText = 0
// let comTextMinus = 0
// delete edit and cehck==========================
elList.addEventListener('click', (evt) => {
  if (evt.target.matches('.js-delbtn')) {
    const x = evt.target.dataset.todoId;
    const findedIndex = todos.findIndex((item) => item.id == x);
    allBtnText.textContent = `(${todos.length - 1})`
    // uncompleatedText.textContent = `(${todos.length})`
    todos.splice(findedIndex, 1)
    render(todos, elList)
  }
  if (evt.target.matches('.js-editbtn')) {
    const findedItem = todos.find((item) =>
      item.id == evt.target.dataset.todoId);
    const edit = prompt('Edit todo:', findedItem.text);
    findedItem.text = edit;
    render(todos, elList)
  }
  if (evt.target.matches('.js-check')) {
    const itemId = evt.target.dataset.todoId;
    const findItem = todos.find((item) =>
      item.id == itemId);
    findItem.isCompleated = !findItem.isCompleated;
    const filteredTodo = todos.filter((item) => {
      return item.isCompleated == true;
    })

    compleatedText.textContent = 
    `(${filteredTodo.length})`;
    uncompleatedText.textContent = 
    `(${todos.length - filteredTodo.length})`;
    render(todos, elList);

    
  }
  
})
// ======================================================

// splice========================

// var x = [1,2,3,4,5,6]

// x.splice(0,3)
// console.log(x);
// // splice = удадяет значкния списка =>
// // 0 - начало || 3 - сколько удалить
