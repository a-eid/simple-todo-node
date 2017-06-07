// there could be alot more data here 
const todos = []
var data = [ 'firsttodo' , 'secondtodo' , 'thirdtodo' , 'forthtodo']
let id = 0
data.forEach( d => todos.push({
  id: ++id ,
  name: d , 
  completed: Math.random() >= 0.5
}))


module.exports =  todos  




