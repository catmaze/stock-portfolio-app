import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const defaultHistory = []

/**
 * ACTION CREATORS
 */
const getHistory = history => ({type: GET_HISTORY, history})

/**
 * THUNK CREATORS
 */
export const gotHistory = () => async dispatch => {
  try {
    const res = await axios.get('/api/user/history')
    dispatch(getHistory(res.data || defaultHistory))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultHistory, action) {
  switch (action.type) {
    case GET_HISTORY:
      return action.history
    default:
      return state
  }
}
