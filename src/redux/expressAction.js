import api from '../api'
// Constants
import { VERSION, expressConstant } from '../constants'
import { readToken } from '../helpers'

export const setParams = params => {
  return {
    type: expressConstant.SET_EXPRESS_PARAMS,
    payload: params
  }
}

export const setFilter = filter => (dispatch, getState) => {
  const state = getState().Express
  dispatch({
    type: expressConstant.SET_EXPRESS_FILTER,
    payload: {
      ...state.filter,
      ...filter
    }
  })
}

export const fetchList = () => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const state = getState().Express
    const args = {
      limit: state.limit,
      page: state.page,
      sort: state.sort,
      filter: state.filter
    }
    const token = await readToken()

    let url = `${VERSION}/expresses/list`
    const headers = {}
    if (token !== null) {
      url = `${VERSION}/${prefix}/expresses/list`
      headers.Authorization = `Bearer ${token}`
    }

    const response = await api.post(url, args, { headers })

    if (response.status === 200) {
      const data = response.data.data
      dispatch({
        type: expressConstant.FETCH_LIST_EXPRESS,
        payload: data
      })
    }

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const fetchNextList = () => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const state = getState().Express
    const args = {
      limit: state.limit,
      page: state.page,
      sort: state.sort,
      filter: state.filter
    }
    const token = await readToken()

    let url = `${VERSION}/expresses/list`
    const headers = {}
    if (token !== null) {
      url = `${VERSION}/${prefix}/expresses/list`
      headers.Authorization = `Bearer ${token}`
    }

    const response = await api.post(url, args, { headers })

    if (response.status === 200) {
      const data = response.data.data
      if (data.docs.length > 0) {
        data.docs = state.data.concat(data.docs)
        dispatch({
          type: expressConstant.FETCH_LIST_EXPRESS,
          payload: data
        })
      } else {
        dispatch(setParams({ page: state.page - 1 }))
      }
    }

    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const doSupport = (id, index) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const data = getState().Express.data
    const token = await readToken()
    const url = `${VERSION}/${prefix}/expresses/${id}/support`
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      data[index] = response.data.data
      dispatch({
        type: expressConstant.SET_EXPRESS_DATA,
        payload: data
      })
    }
  } catch (error) {
    return error.response.data
  }
}

export const doNotRelevan = (id, index) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const data = getState().Express.data
    const token = await readToken()
    const url = `${VERSION}/${prefix}/expresses/${id}/not-relevan`
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      data[index] = response.data.data
      dispatch({
        type: expressConstant.SET_EXPRESS_DATA,
        payload: data
      })
    }
  } catch (error) {
    return error.response.data
  }
}

// export const setActiveId = id => {
//   return {
//     type: expressConstant.SET_EXPRESS_ACTIVE_ID,
//     payload: id
//   }
// }

// export const setDetail = detail => {
//   return {
//     type: expressConstant.SET_EXPRESS_DETAIL,
//     payload: detail
//   }
// }

// export const create = args => async () => {
//   try {
//     const token = readAuthentication()
//     const url = `${VERSION}/${readPrefix()}/expresses`
//     const response = await api.post(url, args, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     return response.data
//   } catch (error) {
//     return error.response.data
//   }
// }

// export const update = (id, args) => async () => {
//   try {
//     const token = readAuthentication()
//     const url = `${VERSION}/${readPrefix()}/expresses/${id}`
//     const response = await api.put(url, args, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     return response.data
//   } catch (error) {
//     return error.response.data
//   }
// }
