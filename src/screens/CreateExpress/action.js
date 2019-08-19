import api from '../../api'
import { readToken, saveProfile, readProfile } from '../../helpers'
import { VERSION, authConstant } from '../../constants'

export const firstStep = () => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const token = await readToken()

    const url = `${VERSION}/${prefix}/expresses/first-step`
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    return error
  }
}

export const upload = (id, args) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const token = await readToken()

    const url = `${VERSION}/${prefix}/expresses/${id}/upload-image`
    const response = await api.put(url, args, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const update = (id, args) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const token = await readToken()

    const url = `${VERSION}/${prefix}/expresses/${id}/update`
    const response = await api.put(url, args, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    return response.data
  } catch (error) {
    return error.response.data
  }
}
