import mongoose from 'mongoose';
import { connection } from  '../configs';

const Schema = mongoose.Schema;

const users = {
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  uid: {
    type: String,
    required: [true, 'user Id is required'],
    unique: true,
  },
  name: {
    type: String,
  },
  picture: {
    type: String,
  },
  blockers: [{type: Schema.Types.ObjectId, ref: 'Blockers' }]
};

const usersShema = Schema(users);
const usersModel = connection.model('Users', usersShema);

export default usersModel;


