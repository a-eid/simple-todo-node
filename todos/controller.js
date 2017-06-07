const todos = require('./model')
let id = todos.length 

// return all todos 
exports.all = ( req , res ) => { 
  res.json(todos)
}  

// add  a new todo 

exports.add = ( req , res ) => {
  const todo = Object.assign( {} , req.body , { id: ++id } )
  todos.push(todo) 
  res.send({ message: "todo added successfully" , todo })
}


// get a new todo 
exports.one = (req , res) => {
  const [todo] = todos.filter( t => t.id == req.params.id ) 
  if( todo ) 
    return res.json(todo) 
  return { message: `can't find todo`}
}

// edit || replace a certain todo 

// patch request 
exports.edit = ( req , res ) => {
  const i = todos.findIndex( t => t.id == req.params.id )
  if(i < 0 ) return res.json({message: "can't find todo"})
  todos[i] = Object.assign(todos[i] , req.body)
  console.log('editing')
  res.json({
    message: "todo edited successfully", 
    todo: todos[i]
  })
}

// put request 
exports.replace = ( req , res ) => {
  const i = todos.findIndex( t => t.id == req.params.id )
  if(index < 0 ) return res.json({message: "can't find todo"})
  todo[i] = Object.assign( {} , todo[i] , req.body )
  res.json({
    message: "todo edited successfully", 
    todo: todo[i]
  })
}

// delete a certain todo 

exports.dlt = (req , res) => {
  const i = todos.findIndex( t => t.id == req.params.id )
  if(index < 0 ) return res.json({message: "can't find todo"})
  todo = todo[i] 
  todos.splice(i , 1)
  res.json({
    message: "todo deleted successfully",
    todo
  })
}

