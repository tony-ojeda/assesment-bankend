const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.services');
const { body } = require('express-validator');
const { 
  getAllFavorites,
  getFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite,
} = require('./favorite.controller')

const router = Router()

router.get('/', isAuthenticated(),  getAllFavorites)
router.get('/:id', isAuthenticated(), getFavoriteById)
router.post('/',
  body('name').isLength({ min: 2}).withMessage("Name list min 4 characteres"), 
  isAuthenticated(),
  createFavorite
)
router.put('/:id', isAuthenticated(), updateFavorite)
router.delete('/:id', isAuthenticated(), deleteFavorite)

module.exports = router
