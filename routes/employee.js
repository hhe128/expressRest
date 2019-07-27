'use strict';

const express = require('express');
const router = express.Router();


const { check, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

var getContent = require("./../data/content");

const DATABASE = {
  content : getContent()
};

var employees = function() { return DATABASE.content };

/* GET employees listing. */
router.get('/', function(req, res) {
  return res.send(DATABASE.content);
});

router.post('/',
  check('firstname').isLength({ min: 1 }).not().isEmpty().isAlphanumeric().trim().withMessage('First Name empty.'),
  check('lastname').isLength({ min: 1 }).not().isEmpty().isAlphanumeric().trim().withMessage('lasst Name empty.'),
  check('title').isLength({ min: 1 }).not().isEmpty().isAlpha().trim().withMessage('title empty.'),
  sanitizeBody('firstname').trim().escape(),
  sanitizeBody('lastname').trim().escape(),
  function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({ errors: errors.array() });
    }
    
    var emp = {
      "firstName" : req.body.firstname,
      "lastName" :  req.body.lastname,
      "hireDate" : new Date(),
      "role": req.body.title,
      "id": DATABASE.content.length + 1 
  }
  
  if("CEO" == emp.role.toUpperCase() ) {
    let result = DATABASE.content.find(emp => emp.role == 'CEO' );
    if ( result) {
      return res.status(400).send('Can only have one CEO.');
    }
  }

  console.log(emp.hireDate);
  DATABASE.content.push(emp);
  console.log(DATABASE.content);
  res.send("Successfully added " + emp.firstName + " " + emp.lastName) + " !";
});

router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  console.log("id=" + id);
  if ( ! isNormalInteger(id) ) {
    return res.status(400).send("Invalid employee id");
  }
  var result = [];
  DATABASE.content.forEach(emp =>{ if(emp.id !=- -1 && emp.id == parseInt(id)) result.push(emp)});
  console.log(result.length);
  var employee = result.shift();
  if ( ! employee ) return next('No employee with id ' + id + ' found');
  console.log(employee);
  return res.send(employee);
});

router.delete('/:id', function(req, res, next) {
  let id = req.params.id;
  console.log("id=" + id);
  if ( ! isNormalInteger(id) ) {
    return res.status(400).send("Invalid employee id");
  }
  
  var result = DATABASE.content.find(emp => emp.id != -1 && emp.id == parseInt(id));
  if ( result ) {
    result.id = -1;
    return res.send(result);
  }
  else {
    return res.status(400).send("No Found");
  }
});

router.put('/:id', 
check('firstname').isLength({ min: 1 }).not().isEmpty().isAlphanumeric().trim().withMessage('First Name empty.'),
check('lastname').isLength({ min: 1 }).not().isEmpty().isAlphanumeric().trim().withMessage('lasst Name empty.'),
check('title').isLength({ min: 1 }).not().isEmpty().isAlpha().trim().withMessage('title empty.'),
sanitizeBody('firstname').trim().escape(),
sanitizeBody('lastname').trim().escape(),
sanitizeBody('title' ).trim().escape(),
function(req, res, next) {
  let id = req.params.id;
  console.log("id=" + id);
  if ( ! isNormalInteger(id) ) {
    return res.status(400).send("Invalid employee id");
  }

  var emp = DATABASE.content.find(emp => emp.id != -1 && emp.id == parseInt(id));
  if ( emp ) {
      let updatedEmp = req.body;
      console.log(updatedEmp);
      if ( updatedEmp.title.toUpperCase() =='CEO' ) {
        let ceo = DATABASE.content.find(emp => emp.id != -1 && emp.id != parseInt(id) && emp.role == 'CEO');
        if ( ceo ) {
            return res.status(400).send("Already has a CEO");
        }
      }
      DATABASE.content[emp.id].firstName=updatedEmp.firstname;
      DATABASE.content[emp.id].lastName=updatedEmp.lastname;
      DATABASE.content[emp.id].role=updatedEmp.title.toUpperCase();
      console.log('update done');
      return res.send("Update Done" + JSON.stringify(DATABASE.content[emp.id]));
      
  }
  else {
    return res.status(400).send("Employee Not Found");
  }
});

function isNormalInteger(str) {
  return /^\+?(0|[1-9]\d*)$/.test(str);
}

module.exports =  router;
//module.exports.employees = employees;
