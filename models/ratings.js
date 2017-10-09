export default {
  emails: {
    type: [{}],
    set: (emails) => {
      return [...new Set(emails)];
    }
  }
};
