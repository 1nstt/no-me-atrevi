import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  to: {
    type: String,
    required: [true, 'El campo "to" es obligatorio'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'El mensaje es obligatorio'],
    trim: true
  },
  timeAgo: {
    type: String,
    default: 'HOY'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  reportsCounter: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  }

});

const Card = mongoose.model('Card', cardSchema);

export default Card;