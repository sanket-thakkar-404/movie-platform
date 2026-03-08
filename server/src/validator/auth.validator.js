const { body } = require('express-validator');


// signup 
module.exports.signupValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email Required')
    .isEmail().withMessage('Invalid Email'),

  body('password')
    .notEmpty().withMessage('Password Required')
    .isLength({ min: 6 }).withMessage('Password Must Be 6 character'),

  body('name')
    .notEmpty().withMessage('Name required')
    .isLength({ min: 3 }).withMessage('name must be 3 Character'),
]

/* LOGIN */
module.exports.loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email required')
    .isEmail().withMessage('Invalid email'),

  body('password')
    .notEmpty().withMessage('Password required'),
];
