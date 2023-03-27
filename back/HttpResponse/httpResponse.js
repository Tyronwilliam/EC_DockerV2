const HTTPCode = {
  user: {
    SUCCESS: {
      register: ["User created"],
      login: ["Login Successfully"],
    },
    ERROR: {
      register: [
        "You already have an account",
        "Could not create user",
        "Error confirming user:",
      ],
      login: ["User doesn't exist", "Password mismatch", "Could not login" , "Confirm your address"],
    },
  },
};

module.exports = {
  HTTPCode,
};
