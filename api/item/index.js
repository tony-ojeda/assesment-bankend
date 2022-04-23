const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.services');
const { body } = require('express-validator');
const { 
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require('./item.controller')

const router = Router()

router.get('/', isAuthenticated(),  getAllItems)
router.get('/:id', isAuthenticated(), getItemById)
router.post('/',
  body('title').isLength({ min: 2}).withMessage("Name list min 2 characteres"), 
  isAuthenticated(),
  createItem
)
router.put('/:id', isAuthenticated(), updateItem)
router.delete('/:id', isAuthenticated(), deleteItem)

module.exports = router
