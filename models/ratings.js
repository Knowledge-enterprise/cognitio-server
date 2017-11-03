import mongoose from 'mongoose';
import { connection } from  '../configs';

const Schema = mongoose.Schema;

const ratings = {
  _id: Schema.Types.ObjectId,
  emails: {
    type: [{}],
    set: (emails) => {
      return [...new Set(emails)];
    },
    required: [true, 'email is required to rate'],
  },
};

const ratingsShema = Schema(ratings);
const ratingsModel = connection.model('Ratings', ratingsShema);

export default ratingsModel;

