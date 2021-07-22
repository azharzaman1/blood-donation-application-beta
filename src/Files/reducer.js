export let initialState = {
  userState: "",
  currentUser: null,
  fetchedUserDetails: null,
};

export const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case "SET_USER_STATE":
      return {
        ...state,
        userState: action.userState,
      };

    case "SET_USER":
      return {
        ...state,
        currentUser: action.user,
      };
    case "SET_FETCHED_USER_DETAILS":
      return {
        ...state,
        fetchedUserDetails: action.fetchedUser,
      };
  }
};
