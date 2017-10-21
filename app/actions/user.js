export const addUser = (user) => (
  {
    type: 'ADD_USER',
    user
  }
);

export const removeUser = () => (
  {
    type: 'REMOVE_USER'
  }
);

export const updateProfilePic = (profilePic) => (
  {
    type: 'UPDATE_PROFILE_PIC',
    profilePic
  }
);
