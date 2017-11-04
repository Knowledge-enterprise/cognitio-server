import mongoose from 'mongoose';
import { connection } from  '../configs';

const Schema = mongoose.Schema;

const categories = {
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
    required: [true, 'category name is required'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    unique: true,
    trim: true,
  },
};

const categoriesShema = Schema(categories);
const categoriesModel = connection.model('Categories', categoriesShema);

/**
 * Custom validations
 */
categoriesShema.path('name').validate(function(value, callback) {
  categoriesModel.count({ name: value }, function(error, count) {
      if (error) {
        return done(error);
      }
      callback(!count);
  });
}, { message: 'category name already exists', isAsync: true });


export default categoriesModel;
