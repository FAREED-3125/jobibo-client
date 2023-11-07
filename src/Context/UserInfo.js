const { useReducer, createContext } = require("react");

const UserStorage = "userInfo";

const initialstate = JSON.parse(localStorage.getItem(UserStorage)) || {
  UserID: null,
  username: null,
  email: null,
};

export const userDispatchOption = {
  Login: "login",
  Logout: "logout",
};

const handleUserDispatch = (state, action) => {
  switch (action.type) {
    case userDispatchOption.Login:
      localStorage.setItem(UserStorage, JSON.stringify(action.payload));
      return action.payload;
      case userDispatchOption.Logout:
      localStorage.removeItem(UserStorage);
      return {};
  }
};
export const UserContext = createContext();
const UserInfoProvider = ({ children }) => {
  const [userInfo, dispatch] = useReducer(handleUserDispatch, initialstate);
  return (
    <UserContext.Provider value={{ dispatch, userInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserInfoProvider;
