// Context/context.js
import { createContext } from "react";

const user = {
  email: "",
  password: "",
  isLoggedIn: false,
};

const logOut = () => {};

const newContext = createContext({ user, logOut });

export default newContext;