import { combineReducers } from "redux"

import authR from "./AuthReducer"
import thingsR from "./ThingsReducer"

export default combineReducers({
    authR,
    thingsR
})
