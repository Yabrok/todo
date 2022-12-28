const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elAddBtn = document.querySelector('.js-addBtn');
const elList = document.querySelector('.js-list');

const btnBox = document.querySelector('.js-btnbox');
const allBtnText = document.querySelector('.js-allbtntext');
const compleatedText = document.querySelector('.compleatedtext');
const uncompleatedText = document.querySelector('.uncompleatedtext');

const localData = JSON.parse(window.localStorage.getItem('todos'))
const todos = localData ? localData : [];

function render(array, node) {
  window.localStorage.setItem('todos', JSON.stringify(todos));
  node.innerHTML = ''
  allBtnText.textContent = `(${todos.length})`;
  compleatedText.textContent = `(${todos.filter((item) => item.isCompleated).length})`
  uncompleatedText.textContent = `(${todos.filter((item) => item.isCompleated == false).length})`
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

render(todos, elList)







// ==============================================
elForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  let obj = {
    id: todos.length ? todos[todos.length - 1].id + 1 : 1,
    text: elInput.value,
    isCompleated: false,
  };
  todos.push(obj);
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
  if (evt.target.matches('.js-clearbtn')) {
    window.localStorage.removeItem('todos');
    render(todos, elList)
  }

})

let comText = 0
elList.addEventListener('click', (evt) => {
  if (evt.target.matches('.js-delbtn')) {
    const x = evt.target.dataset.todoId;
    const findedIndex = todos.findIndex((item) => item.id == x);
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

    render(todos, elList);


  }

})

// =====darkmode======================
const modeBtn = document.querySelector('.js-modebtn')
let theme = false;

modeBtn.addEventListener('click', function(){
  theme = !theme;
  let bg = theme ? 'dark' : 'light';
  window.localStorage.setItem('theme', bg);
  changeMode()
})

function changeMode(){
  if(window.localStorage.getItem('theme') == 'dark'){
    document.body.classList.add('dark');
  }
  else{
    document.body.classList.remove('dark');

  }
}
changeMode()

// ======================================================

// splice========================

// var x = [1,2,3,4,5,6]

// x.splice(0,3)
// console.log(x);
// // splice = удадяет значкния списка =>
// // 0 - начало || 3 - сколько удалить
