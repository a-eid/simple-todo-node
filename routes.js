const router = require('express').Router() 
const todos = require('./todos/router')

router.use('/todos' , todos)
router.get('/' , (req , res) => res.render('index'))

module.exports = router
