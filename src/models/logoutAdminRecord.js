import { parse } from 'qs'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { query, queryVideoOrder } from '../services/logoutAdminRecord'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'logoutAdminRecord',
  state: {
    auditStatus: '',
    dataSource: [],
    currentItem: {},
    currentList: '',
    page: '',
    remark: '',
    id: '',
  },
  reducers: {
    currentList (state, action) {
      return { ...state, ...action.payload }
    },
    changeType (state, action) {
      return { ...state, ...action.payload }
    },
    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map((user) => {
        if (user.id === newUser.id) {
          return { ...user, ...newUser }
        }
        return user
      })
      return { ...state, list: newList }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    createSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
  },
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(query, parse({ ...payload }))
      if (success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data,
            pagination: {
              total,
              pageSize: Number(pageSize) || 20,
              current: Number(page),
            },
          },
        })
      }
    },
    *queryVideoOrder ({ payload }, { call, put }) {
      const data = yield call(queryVideoOrder, payload)
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
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/logoutAdminRecord').exec(location.pathname)
        const match2 = pathToRegexp('/logoutAdminRecord/edit/:id').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          dispatch({
            type: 'updateQueryKey',
            payload: {
              auditStatus: '',
            },
          })
          dispatch({
            type: 'query',
            payload: {
              auditStatus: '',
            },
          })
        }
        if (match2) {
          if (match2 !== 'new') {
            dispatch({
              type: 'currentList',
              payload: {
                currentList: location.query.currentList,
              },
            })
            dispatch({
              type: 'createSuccess',
              payload: {
                currentItem: {},
              },
            })
            dispatch({
              type: 'queryVideoOrder',
              payload: {
                id: match2[1],
              },
            })
          } else {
            dispatch({
              type: 'createSuccess',
              payload: {
                currentItem: {},
              },
            })
          }
        }
      })
    },
  },
})
