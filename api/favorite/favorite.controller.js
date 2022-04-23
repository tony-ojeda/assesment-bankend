const Favorite = require('./favorite.model')
const Item = require('../item/item.model')
const { validationResult } = require('express-validator');

async function getAllFavorites(req, res) {
  const { page, limit, search,  user } = req.query

  const skip = limit * ( page - 1);
  const query = {};
  user ? query["user"] = user : '';

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    const favorites = await Favorite.find({...query, $or: [{ name: searchValue }] })
      .select('_id name user list')
      .populate('user', '_id email')
      .populate({
        path: 'list.item',
        model: 'Item',
        select: '_id title description link',
      })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc'});
    
    res.status(200).json(favorites)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function getFavoriteById(req, res) {
  const { id } = req.params
  try {
    const favorite = await Favorite.findById(id) 
      .select('_id name user list')
      .populate('user', '_id email')
      .populate({
        path: 'list.item',
        model: 'Item',
        select: '_id title description link',
      })

    res.status(200).json(favorite)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createFavorite(req, res) {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const { errors } = validationResult(req);
  if ( errors.length ) {
    return res.status(400).json({ errors });
  }
  const payload = { ...req.body, user: req.user._id}

  try {
    const favorite = await Favorite.create( payload )
    res.status(200).json(favorite)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function updateFavorite(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const favorite = await Favorite.findByIdAndUpdate(id, info, { new: true })
      .select('_id name user list')
      .populate('user', '_id email')
      .populate({
        path: 'list.item',
        model: 'Item',
        select: '_id title description link',
      })

    res.status(200).json(favorite)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteFavorite(req, res) {
  const { id } = req.params
  try {
    const favorite = await Favorite.findByIdAndDelete(id)
    res.status(200).json({ message: 'Favorite deleted succesfully', favorite })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllFavorites,
  getFavoriteById,
  createFavorite,
  updateFavorite,
  deleteFavorite,
}
