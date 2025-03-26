const express = require('express');
const router = express.Router()
const {addPersonalDetails, 
    addEdDetails, 
    addProjectDetails, 
    addTechSkill, 
    addExp, 
    addActivity} = require('../controller/Details');

router.route('/addDetails')

module.exports = router;