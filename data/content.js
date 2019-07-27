var ROLES = {
    CEO: "CEO",
    VP: "VP",
    MANAGER: "MANGER",
    LACKEY: "LACKEY"
  };

var content = [
    {
       "firstName" : "Charles",
       "lastName" : "Carter",
       "hireDate" : new Date('1995-12-17 03:24:00'),
       "role": ROLES.CEO,
       "id": 1
    },  
    {
      "firstName" : "Victor",
      "lastName" : "Van Hausen",
      "hireDate" : new Date('1996-01-10 08:00:00'),
      "role": ROLES.VP,
      "id": 2
    },
    
    {
      "firstName" : "Margaret",
      "lastName" : "McDonald",
      "hireDate" : new Date('1996-04-12 08:00:00'),
      "role": ROLES.MANAGER,
      "id": 3
    },
    {
      "firstName" : "Larry",
      "lastName" : "Lee",
      "hireDate" : new Date('1996-05-10 08:00:00'),
      "role": ROLES.LACKEY,
      "id": 4
    },
    {
      "firstName" : "Leslie",
      "lastName" : "Lang",
      "hireDate" : new Date('1996-05-11 08:00:00'),
      "role": ROLES.LACKEY,
      "id": 5
    }
  ]
  var employees = function() { return content };
  module.exports = employees;