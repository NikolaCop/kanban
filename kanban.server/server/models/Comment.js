import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.SchemaTypes.ObjectId

const Comment = new Schema(
  {
    description: { type: String, required: true },
    creatorId: { type: String, ref: 'Account', required: true },
    task: { type: ObjectId, ref: 'Task', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

Comment.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})
export default Comment
