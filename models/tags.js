import mongoose from 'mongoose';
import { connection } from  '../configs';

const Schema = mongoose.Schema;

const tags = {
  name: {
    type: String,
    trim: true,
    text: true,
  },
};

const tagsSchema = Schema(tags);
const tagsModel = connection.model('Tags', tagsSchema);

export default tagsModel;
