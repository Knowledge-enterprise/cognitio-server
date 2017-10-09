export default {
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [{}],
    required: true,
    set: (tags) => {
      return [...new Set(tags)];
    }
  },
  files: {
    type: [{}],
    required: false,
  }
};
