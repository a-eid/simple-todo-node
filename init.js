const path = require('path')
const bodyParser = require('body-parser') 
const routes = require('./routes') 
const {env} = require('./config')

module.exports = (app) => {

  app.use( bodyParser.urlencoded({ extended: true }) )
  app.use( bodyParser.json() )

  app.use(require('express').static(path.join( __dirname , 'public' )))
  
  if(env != "production" )
    app.locals.pretty = true 


  app.set('view engine' , 'pug')

  app.use('/' , routes )
}
