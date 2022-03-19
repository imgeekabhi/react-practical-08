const initialState = {
  user: null,
};

export const Reducer = (state = initialState, { type, payload }) => {
  if (type === "SIGNUP") {
    return {
      user: payload,
    };
  } else if (type === "LOGOUT") {
    return {
      user: null,
    };
  } else {
    return state;
  }
};
