const router = require('express').Router() 
const {all , add ,  one , edit , replace , dlt , completed , active} = require('./controller') 


router.route('/').get(all).post(add) 
router.route('/:id').get(one).put(replace).delete(dlt) 
router.route('/:id/toggle').post(edit)


module.exports = router 

