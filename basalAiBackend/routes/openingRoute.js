
const express = require('express');

const {getOpening ,createOpening,closeOpening,deleteOpening} = require("../controllers/openingController");

const OpeningRouter = express.Router()

const {auth} = require("../middlewares/auth")
const {rbac} = require("../middlewares/rbac")


OpeningRouter.get('/' , getOpening ) // for get all openings
OpeningRouter.post('/' ,auth , rbac([ 'company']) , createOpening ) // for add  the opening
OpeningRouter.put('/:id' ,auth , rbac([ 'company']) , closeOpening) // for close the opening
OpeningRouter.delete('/:id' ,auth , rbac([ 'company']) , deleteOpening) // for delete the opening


module.exports ={OpeningRouter}