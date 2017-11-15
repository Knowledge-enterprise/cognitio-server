import mongoose from 'mongoose';
import { connection } from  '../configs';

const Schema = mongoose.Schema;

const replies = {
  reply: {
    type: String,
    required: [true, 'content is required'],
    trim: true,
  },
  createdAt : {
    type : Date,
    default:  Date.now(),
  },
  updatedAt : {
    type : Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: 'Comments',
  },
  rating: {
    type: Schema.Types.Array,
    default: [],
  },
};

const repliesShema = Schema(replies);
const replyModel = connection.model('Replies', repliesShema);

export default replyModel;
