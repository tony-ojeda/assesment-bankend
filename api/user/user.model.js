const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    status: {
      type: String,
      default: 'pending',
      enum: ['deleted', 'active', 'pending'],
      required: true
    },
  },
  {
    timestamps: true
  }
)

UserSchema.pre('save', async function(next) {
  const user = this
  try {
    if (!user.isModified('password')) {
      return next()
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash

  } catch(error) {
    next(error)
  }
  next()
})

UserSchema.methods.comparePassword = async function (password) {
  const user = this
  return await bcrypt.compare(password, user.password)
}

UserSchema.methods.changePassword = async function (password){
  const user = this;
  return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('User', UserSchema)
