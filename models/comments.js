import mongoose from "mongoose";
import { connection } from "../configs";

const Schema = mongoose.Schema;

const comments = {
  comment: {
    type: String,
    required: [true, "content is required"],
    trim: true
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  blocker: {
    type: Schema.Types.ObjectId,
    ref: "Blockers"
  },
  rating: {
    type: Schema.Types.Array,
    default: []
  },
  isReply: {
    type: Boolean,
    default: false
  },
  replies: {
    type: [Schema.Types.ObjectId]
  },
  commentId: {
    type: Schema.Types.ObjectId,
    default: null
  }
};

const commentsShema = Schema(comments);
const commentModel = connection.model("Comments", commentsShema);

export default commentModel;
