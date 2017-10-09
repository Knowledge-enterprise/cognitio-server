export default {
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    unique: true,
    trim: true,
  },
};
