import api from '../../api'
import {
  readToken,
  saveProfile,
  readProfile,
  clearStorage
} from '../../helpers'
import { VERSION, authConstant } from '../../constants'

export const fetchProfile = (redirect = true) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const token = await readToken()
    const profile = await readProfile()

    if (redirect && token === null) {
      throw {
        status: 403,
        message: 'Anda belum login'
      }
    }

    if (token && profile === null) {
      const url = `${VERSION}/${prefix}/profile`
      const response = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      await saveProfile(response.data.data)
    }

    // let profileAgain = await readProfile()
    dispatch({
      type: authConstant.SET_PROFILE,
      payload: profile
    })
    return {
      status: 200
    }
  } catch (error) {
    if (error.status === 403) {
      return error
    } else if (error.response.status === 403) {
      return {
        status: 403,
        message: error.response.data.message
      }
    }
    return error
  }
}

export const logout = () => async dispatch => {
  await clearStorage()
  dispatch({
    type: authConstant.SET_PROFILE,
    payload: null
  })
}
