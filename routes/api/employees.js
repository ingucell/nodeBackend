const express = require('express')
const router = express.Router();
const path = require('path');
const employeesController = require('../../controllers/employeesController');
const verifyJWT = require('../../middleware/verifyJWt')

router.route('/')
  .get(employeesController.getAllEmployees)
  .post(employeesController.createNewEmployee)
  .put(employeesController.updateEmployees)
  .delete(employeesController.removeEmployees)
 
module.exports = router;