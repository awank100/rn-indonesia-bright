import { authConstant } from '../../constants'

const initialState = {
  prefix: 'member',
  profile: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstant.SET_PROFILE:
      return { ...state, profile: action.payload }

    default:
      return state
  }
}
