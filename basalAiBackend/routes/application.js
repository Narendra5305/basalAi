

const express = require('express');
const { getAllInterviewRequests, addInterviewRequest,acceptInterviewRequest,rejectInterviewRequest} = require("../controllers/applicationController")

const {auth} = require("../middlewares/auth")
const {rbac} = require("../middlewares/rbac")

const ApplicationRouter = express.Router()


ApplicationRouter.get('/interview-requests' , auth  , getAllInterviewRequests ) // for get all requests
ApplicationRouter.post('/interview-requests/add/:id' ,auth , addInterviewRequest  ) // for add request
ApplicationRouter.patch('/interview-requests/:id/accept' , auth , rbac([ 'company']) , acceptInterviewRequest ) // for accept request
ApplicationRouter.patch('/interview-requests/:id/reject' , auth , rbac([ 'company']) , rejectInterviewRequest ) // for reject request
 


module.exports ={ApplicationRouter}