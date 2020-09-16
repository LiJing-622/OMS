import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import {
  query,
  cancelApplyStart,
  queryUser,
  create,
  update,
} from '../services/cashRefund'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'cashRefund',

  state: {
    detailsItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
  },

  reducers: {
    titles (state, action) {
      return { ...state, detailsItem: action.payload.detailsItem }
    },
    query2 (state, action) {
      return { ...state, ...action.payload }
    },
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
    models (state, action) {
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
    *query ({ payload }, { put, call }) {
      yield put({
        type: 'updateQueryKey',
        payload: { page: 1, keyword: '', ...payload },
      })
      const {
        success,
        totalCount: total,
        page,
        pageSize,
        data,
      } = yield call(query, { ...payload })

      if (success) {
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

    *cancelApplyStart ({ payload }, { put, call }) {
      const data = yield call(cancelApplyStart, payload)
      if (data.success) {
        message.success(data.message)
        yield put({
          type: 'query',
          payload: {
            statusList: ['APPLY'],
          } })
      } else {
        message.error(data.message)
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
        yield put({
          type: 'query',
        })
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
        const match = pathToRegexp('/cashRefund').exec(location.pathname)
        // const match2 = pathToRegexp('/cashManagement/edit').exec(location.pathname)
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
              statusList: ['APPLY'],
            },
          })
        }
        // if (match2) {
        //   // dispatch({
        //   //   type: 'clearState',
        //   //   payload: { detailsItem: location.query },
        //   // })
        //   // if (match2[1] !== null) {
        //   //   dispatch({
        //   //     type: 'edit',
        //   //     payload: {
        //   //       code: match2[1],
        //   //     },
        //   //   })
        //   // }
        // }
      })
    },
  },
})
