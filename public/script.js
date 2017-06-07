const d = window.document 
const $ = d.querySelector.bind(document);
const $$ = d.querySelectorAll.bind(document);
const l = console.log.bind(console)


Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};

const base_url = 'http://localhost:3000/todos'
let ul 

const init = () => {
  console.log('init app')
  // ul && ul.remove() 
  fetch(base_url).then( ts => ts.json() ) 
    .then( ts => { 
      renderTodos(ts)
      console.log(ts)
    })
}

$('#addtodo').on('keyup' , e => {
  e.preventDefault() 
  if( e.keyCode != 13 ) return 
  const todo = {
     name: $('#addtodo').value , 
     completed: $('#done').checked
  }

  fetch( base_url , {
    method: 'POST' , 
    body: JSON.stringify(todo),
    headers: {  
      "Content-type": 'application/json',
      "accept": "application/json"
    }
  }).then( t => t.json() )
    .then( t => {
      renderTodo( t )
      clearForm() 
    }) 
    .catch( e => console.log(e))
})


const renderTodos = (todos) => {
  ul = d.createElement('ul') 
  $('.todos').appendChild(ul)
  todos.forEach( t => {
    console.log(t)
    renderTodo(t)
  })
}


const renderTodo = (t) => {
  if( t.message ){
    t = t.todo 
  }
  let li = d.createElement('li')
  let text = d.createTextNode(t.name)
  li.appendChild(text) 
  li.setAttribute( 'data-id' , t.id )
  t.completed && (li.style.textDecoration = 'line-through')
  li.on( 'click' , toggleTodo )
  ul.appendChild(li) 
}

const updateTodo = (id , todo) => {
  console.log(id)
  let todoEl = $(`[data-id="${id}"]`) 
  console.log(todo.name , todo.completed)
  todoEl.textContent = todo.name
  todoEl.style.textDecoration = todo.completed ? "line-through" : "none"
  
}

const clearForm = () => {
  const input = $('#addtodo')  
  $('#done').checked = false 
  input.value = "" 
  input.disabled = true 
  setTimeout( _ => {
    input.disabled = false 
    input.focus() 
  }, 1500)
}

function toggleTodo(e){
  let crossed = this.style.textDecoration == 'line-through'
  const id = this.getAttribute('data-id') 
  fetch( `${base_url}/${id}/toggle` , {
    method: 'post' , 
    body: JSON.stringify({id: id , completed: !crossed }),
    headers: {  
      "Content-type": 'application/json',
      "accept": "application/json"
    }
  }).then( t => t.json() )
    .then( t => {
      updateTodo( id , t.todo ? t.todo : t )
    }) 
    .catch( e => console.log(e))
}

init()

