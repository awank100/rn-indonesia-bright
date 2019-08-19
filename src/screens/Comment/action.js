import api from '../../api'
// Constants
import { VERSION, commentConstant } from '../../constants'
import { readToken } from '../../helpers'

export const setExpress = express => {
  return {
    type: commentConstant.SET_COMMENT_EXPRESS,
    payload: express
  }
}

export const setParams = params => {
  return {
    type: commentConstant.SET_COMMENT_PARAMS,
    payload: params
  }
}

export const setFilter = filter => (dispatch, getState) => {
  const state = getState().Express
  dispatch({
    type: commentConstant.SET_COMMENT_FILTER,
    payload: {
      ...state.filter,
      ...filter
    }
  })
}

export const fetchList = () => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const state = getState().Comment
    const args = {
      limit: state.limit,
      page: state.page,
      sort: state.sort,
      filter: state.filter
    }
    const token = await readToken()

    let url = `${VERSION}/comments/${state.express._id}/list`
    const headers = {}
    if (token !== null) {
      url = `${VERSION}/${prefix}/comments/${state.express._id}/list`
      headers.Authorization = `Bearer ${token}`
    }

    const response = await api.post(url, args, { headers })

    if (response.status === 200) {
      const data = response.data.data
      dispatch({
        type: commentConstant.FETCH_LIST_COMMENT,
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
    const state = getState().Comment
    const args = {
      limit: state.limit,
      page: state.page,
      sort: state.sort,
      filter: state.filter
    }
    const token = await readToken()

    let url = `${VERSION}/comments/${state.express._id}/list`
    const headers = {}
    if (token !== null) {
      url = `${VERSION}/${prefix}/comments/${state.express._id}/list`
      headers.Authorization = `Bearer ${token}`
    }

    const response = await api.post(url, args, { headers })

    if (response.status === 200) {
      const data = response.data.data
      if (data.docs.length > 0) {
        data.docs = state.data.concat(data.docs)
        dispatch({
          type: commentConstant.FETCH_LIST_EXPRESS,
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

export const doLove = (id, index) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const expressId = getState().Comment.express._id
    const data = getState().Comment.data
    const token = await readToken()
    const url = `${VERSION}/${prefix}/comments/${expressId}/love/${id}`
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      data[index] = response.data.data
      dispatch({
        type: commentConstant.SET_COMMENT_DATA,
        payload: data
      })
    }
  } catch (error) {
    return error.response.data
  }
}

export const create = (args) => async (dispatch, getState) => {
  try {
    const prefix = getState().Auth.prefix
    const expressId = getState().Comment.express._id
    const data = getState().Comment.data
    const token = await readToken()
    const url = `${VERSION}/${prefix}/comments/${expressId}/create`
    const response = await api.post(url, args, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      data.push(response.data.data)
      dispatch({
        type: commentConstant.SET_COMMENT_DATA,
        payload: data
      })
    }
    return response.data
  } catch (error) {
    return error.response.data
  }
}
