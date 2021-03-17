import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const List = new Schema(
  {
    description: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    board: { type: ObjectId, ref: 'Board', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

List.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default List
