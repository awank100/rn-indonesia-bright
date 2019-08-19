import { commentConstant } from '../../constants'

const initialState = {
  express: null,
  page: 0,
  pages: null,
  limit: 20,
  sort: null,
  filter: {},
  data: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case commentConstant.SET_COMMENT_EXPRESS:
      return { ...state, express: action.payload }

    case commentConstant.SET_COMMENT_PARAMS:
      return {
        ...state,
        page: action.payload.page ? action.payload.page : state.page,
        limit: action.payload.limit ? action.payload.limit : state.limit,
        sort: action.payload.sort ? action.payload.sort : state.sort,
        filter: action.payload.filter ? action.payload.filter : state.filter
      }

    case commentConstant.SET_COMMENT_FILTER:
      return {
        ...state,
        filter: action.payload
      }

    case commentConstant.FETCH_LIST_COMMENT:
      return {
        ...state,
        page: action.payload.page,
        pages: action.payload.pages,
        limit: action.payload.limit,
        data: action.payload.docs
      }

    case commentConstant.SET_COMMENT_DATA:
      return {
        ...state,
        data: action.payload
      }

    default:
      return state
  }
}
