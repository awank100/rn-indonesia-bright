import { expressConstant } from '../constants'

const initialState = {
  page: 0,
  pages: null,
  limit: 5,
  sort: null,
  filter: {},
  data: [],
  activeId: null,
  detail: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case expressConstant.SET_EXPRESS_PARAMS:
      return {
        ...state,
        page: action.payload.page ? action.payload.page : state.page,
        limit: action.payload.limit ? action.payload.limit : state.limit,
        sort: action.payload.sort ? action.payload.sort : state.sort,
        filter: action.payload.filter ? action.payload.filter : state.filter
      }

    case expressConstant.SET_EXPRESS_FILTER:
      return {
        ...state,
        filter: action.payload
      }

    case expressConstant.FETCH_LIST_EXPRESS:
      return {
        ...state,
        page: action.payload.page,
        pages: action.payload.pages,
        limit: action.payload.limit,
        data: action.payload.docs
      }

    case expressConstant.SET_EXPRESS_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload
      }

    case expressConstant.SET_EXPRESS_DETAIL:
      return {
        ...state,
        detail: action.payload
      }

    case expressConstant.SET_EXPRESS_DATA:
      return {
        ...state,
        data: action.payload
      }

    default:
      return state
  }
}
