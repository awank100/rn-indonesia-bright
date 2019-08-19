import { combineReducers } from 'redux'
// Reducers
import globalReducer from './globalReducer'
import authReducer from '../screens/Profile/reducer'
import expressReducer from './expressReducer'
import commentReducer from '../screens/Comment/reducer'

const reducer = combineReducers({
  Global: globalReducer,
  Auth: authReducer,
  Express: expressReducer,
  Comment: commentReducer
})

export default reducer
