const express= require('express');
const router=express.Router();
const action=require("./requestfunctions") // Importing action functions

//Login route
router.post('/auth/login', action.login);

// Get routes 
router.get('/admin-dashboard/volunteerlist', action.getVolunteerlist); // all volunteer list
router.get('/admin-dashboard/pending_task', action.getPendingTask); // pending task table
router.get('/admin-dashboard/newsverify', action.newstable) // get news verification table
router.get('/admin-dashboard/assigntable', action.assigntable) ///get assigned volinteer table
router.get('/volunteer-dashboard/pendingtask', action.totalpending) //get total pending task number
router.get('/volunteer-dashboard/volskill', action.volskill) // get list volunteer skill in helpseeker dashborad
//Post routes
router.post("/volunteer/profile",action.profileinfo) //give volunteer info according to user_id
router.post('/admin-dashboard/news/verify', action.verifyNews);// add to pending assignment and removing form news
router.post("/volunteer/completedtask",action.totalcompletedtask)// show total completed task by one volunteer
router.post("/volunteer-dashboard/assigntask",action.assignedtask) //volunteer task table
router.post('/volunteer-dashboard/navname', action.navname) //navbar name 
router.post('/helpseeker/helppost', action.helppost)
//Delete 
// Delete news using source and content
router.delete('/admin-dashboard/newsdelete', action.deleteNews);



module.exports= router;
