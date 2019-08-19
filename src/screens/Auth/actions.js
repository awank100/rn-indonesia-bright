import api from '../../api'
// Constants
import { VERSION, authConstant } from '../../constants'
// Helpers
import { saveToken } from '../../helpers'
// Actions
import { fetchProfile } from '../Profile/actions'

export const login = (email, password) => async dispatch => {
  try {
    const url = `${VERSION}/login`
    const response = await api.post(url, {
      email: email,
      password: password
    })

    if (response.status === 200) {
      await saveToken(response.data.data.Authorization)
      await dispatch(fetchProfile())
    }
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const register = (args) => async dispatch => {
  try {
    const url = `${VERSION}/register`
    const response = await api.post(url, args)

    if (response.status === 200) {
      await saveToken(response.data.data.Authorization)
      await dispatch(fetchProfile())
    }
    return response.data
  } catch (error) {
    return error.response.data
  }
}
