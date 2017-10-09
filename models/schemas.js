import mongoose from 'mongoose';
import dotenv from 'dotenv';
import blockers  from './blockers';
import  categories  from './categories';
import  ratings  from './ratings';
import  users  from './users';

mongoose.Promise = global.Promise;
dotenv.config();

const connection = mongoose.createConnection(process.env.MONGODB_URI || process.env.MONGOLAB_URI);

const blockersShema = new mongoose.Schema(blockers);
const categoriesShema = new mongoose.Schema(categories);
const ratingsShema = new mongoose.Schema(ratings);
const usersShema = new mongoose.Schema(users);


const blockersModel = connection.model('Blockers', blockersShema);
const categoriesModel = connection.model('Categories', categoriesShema);
const ratingsModel = connection.model('Ratings', ratingsShema);
const usersModel = connection.model('Users', usersShema);

export default {
  blockersModel,
  categoriesModel,
  ratingsModel,
  usersModel,
};
