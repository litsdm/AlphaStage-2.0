import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('token');
const initialState = token ? jwtDecode(token) : {};

const users = (state = initialState, { user, type }) => {
  switch (type) {
    case 'ADD_USER':
      return { ...user };

    case 'REMOVE_USER':
      return {};

    default:
      return state;
  }
};

export default users;
