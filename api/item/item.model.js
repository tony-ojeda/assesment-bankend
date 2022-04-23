const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    link: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Item', ItemSchema)
