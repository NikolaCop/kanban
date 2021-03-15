import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    title: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true }

  },
  { timestamps: true, toJSON: { virtuals: true } }
)

export default Board
