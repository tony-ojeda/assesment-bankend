const Item = require('./item.model')
const { validationResult } = require('express-validator');

async function getAllItems(req, res) {
  const { page, limit, search,  user } = req.query

  const skip = limit * ( page - 1);
  const query = {};
  user ? query["user"] = user : '';

  try {

    const searchValue = new RegExp(search, "gi") || undefined
    const item = await Item.find({...query, $or: [{ name: searchValue }] })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: 'desc'});
      
    res.status(200).json(item)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function getItemById(req, res) {
  const { id } = req.params
  try {
    const item = await Item.findById(id) 
    res.status(200).json(item)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function createItem(req, res) {

  // Finds the validation errors in this request and wraps them in an object with handy functions
  const { errors } = validationResult(req);
  if ( errors.length ) {
    return res.status(400).json({ errors });
  }

  try {
    const item = await Item.create( req.body )
    res.status(200).json(item)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  } 
}

async function updateItem(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const item = await Item.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(item)
  } catch(err) {
    console.error(err)
    res.status(400).json({ error: err})
  }
}

async function deleteItem(req, res) {
  const { id } = req.params
  try {
    const item = await Item.findByIdAndDelete(id)
    res.status(200).json({ message: 'Item deleted succesfully', item })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
}
