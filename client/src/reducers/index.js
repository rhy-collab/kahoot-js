import { combineReducers } from "redux";
import users from "./users";
import auth from "./auth";
import quiz from "./quiz";
import language from "./language"
import games from "./games"

export default combineReducers({
  users,
  auth,
  quiz,
  language,
  games
})
