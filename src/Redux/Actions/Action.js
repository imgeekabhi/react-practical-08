const signup = (user_data) => {
  return {
    type: "SIGNUP",
    payload: user_data,
  };
};

const logout = () => {
  return {
    type: "LOGOUT",
  };
};
export { signup, logout };
