import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Task = new Schema(
  {
    description: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    list: { type: ObjectId, ref: 'List', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Task.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Task
