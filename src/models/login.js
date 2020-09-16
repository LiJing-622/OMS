import { routerRedux } from 'dva/router'
import { login } from '../services/app'
import { queryURL } from '../utils'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  },

  effects: {
    *login ({ payload }, { put, call }) {
      console.log({ payload }, '{ payload }')
      yield put({ type: 'showLoginLoading' })
      console.log(payload, 'payload')
      const data = yield call(login, payload)
      console.log(data, data)
      yield put({ type: 'hideLoginLoading' })
      localStorage.setItem('userName', payload.username)

      if (data.success) {
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/'))
        }
      } else {
        throw data
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      console.log('state', state)
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
