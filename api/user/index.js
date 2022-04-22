const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const { getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('./user.controller')
const { isAuthenticated } = require('../../auth/auth.services') 
const router = Router();

router.get('/', getAllUsers)
router.get('/:id',    getUserById)
router.post('/',      
    body('email').isEmail().normalizeEmail().withMessage('Email is not valid!!!'), 
    body("password").isStrongPassword({
        minLength: 5,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
        returnScore: false,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: 0,
        pointsForContainingUpper: 0,
        pointsForContainingNumber: 0,
        pointsForContainingSymbol: 0,
    })
    .withMessage("Password must be greater than 5 and contain at least one uppercase letter, one lowercase letter, and one number"),
    createUser
)
router.put('/:id',    updateUser)
router.delete('/:id', deleteUser)


module.exports = router;