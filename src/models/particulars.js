import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import {
  query,
  queryUser,
  // shareProfit,
  create,
  update,
  remove,
  batchRemove,
} from '../services/particulars'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'Particular',

  state: {
    currentItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    dataSourceData: [],
    fakeList: [],
    titles: [],
  },

  reducers: {
    titles (state, action) {
      return { ...state, ...action.payload }
    },
    query2 (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showModalGrant (state, action) {
      return { ...state, ...action.payload, modalGrantVisible: true }
    },
    hideModalGrant (state) {
      return { ...state, modalGrantVisible: false }
    },
    createSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    deleteSuccess () {},
    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map(user => {
        if (user.id === newUser.id) {
          return { ...user, ...newUser }
        }
        return user
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    clearState (state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    // 传D
    *query ({ payload }, { put, call }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const dateList = yield call(query, { ...payload })
      const { totalCount: total, page, pageSize, data } = dateList.data
      if (dateList.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    // 传c
    *queryData ({ payload }, { put, call }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const dateList = yield call(query, { ...payload })
      const { totalCount: total, page, pageSize, data } = dateList.data
      if (dateList.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            listData: data,
            dataPagination: {
              total,
              pageSize: Number(pageSize) || 10,
              current: Number(page),
            },
          },
        })
      }
    },
    *delete ({ payload }, { call, put }) {
      const data = yield call(remove, { id: payload })
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

    *multiDelete ({ payload }, { call, put }) {
      const data = yield call(batchRemove, payload)
      if (data.success) {
        yield put({ type: 'updateState', payload: { selectedRowKeys: [] } })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *edit ({ payload }, { call, put }) {
      const data = yield call(queryUser, payload)
      if (data.success) {
        yield put({
          type: 'showModal',
          payload: {
            modalType: 'update',
            currentItem: data,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    *create ({ payload }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    *update ({ payload }, { call, put, select }) {
      const id = yield select(({ Patient }) => Patient.currentItem.id)
      const newUser = { ...payload, id }
      const data = yield call(update, newUser)
      if (data.success) {
        yield put({ type: 'hideModal' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/particulars').exec(location.pathname)
        const match2 = pathToRegexp('/patients/edit/:cdoe').exec(
          location.pathname
        )
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          dispatch({
            type: 'query',
            payload: {
              page: location.query.page,
              pageSize: location.query.size,
              txType: location.query.txType,
              serialNo: location.query.serialNo === '' ? null : location.query.serialNo,
              customerId: location.query.customerId === '' ? null : location.query.customerId,
              direction: 'D',
            },
          })
        }
        if (match2) {
          dispatch({
            type: 'clearState',
            payload: { currentItem: {} },
          })
          if (match2[1] !== null) {
            dispatch({
              type: 'edit',
              payload: {
                code: match2[1],
              },
            })
          }
        }
      })
    },
  },
})
