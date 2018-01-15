const categories = (state = '', { type, category }) => {
  switch (type) {
    case 'SET_CATEGORY':
      return category;

    default:
      return state;
  }
};

export default categories;
