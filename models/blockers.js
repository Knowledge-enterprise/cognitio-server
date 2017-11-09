import mongoose from 'mongoose';
import { connection } from '../configs';

const Schema = mongoose.Schema;

const blockers = {
  title: {
    type: String,
    required: [true, 'title is required'],
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'content is required'],
    trim: true,
  },
  tags: {
    type: [{}],
    required: [true, 'tags are required'],
    set: (tags) => {
      return [...new Set(tags)];
    }
  },
  files: {
    type: [{}],
    required: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories',
  },
  rating: {
    type: [String],
    default: [],
  },
  views: {
    type: [{ type: Schema.Types.ObjectId }],
    set: (_id) => {
      return [...new Set(_id)];
    }
  },
  comments: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'Comments',
  }

};

const blockersShema = Schema(blockers);
const blockersModel = connection.model('Blockers', blockersShema);

/**
 * Custom validations
 */
blockersShema.path('title').validate(function (value, callback) {
  blockersModel.count({ title: value }, function (error, count) {
    if (error) {
      return done(error);
    }
    callback(!count);
  });
}, { message: 'title already exists', isAsync: true });

export default blockersModel;
