const mongoose = require('mongoose')

const FavoriteSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    list: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item'
        }
      }
    ]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Favorite', FavoriteSchema)
