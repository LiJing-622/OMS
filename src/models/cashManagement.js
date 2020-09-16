import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import {
  query,
  remitConfirmQuery,
} from '../services/cashManagement'
import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'cashManagemen',
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
    *remitConfirmQuery ({ payload }, { call, put }) {
      const data = yield call(remitConfirmQuery, { ...payload })
      if (data.success) {
        yield put(
          routerRedux.push({
            pathname: '/cashManagement',
          })
        )
        message.success(data.message)
      } else {
        message.error(data.message)
      }
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/cashManagement').exec(location.pathname)
        // const match2 = pathToRegexp('/cashManagement/edit').exec(location.pathname)
        if (match) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }
          console.log(location.query.statusList, 'location.query.statusList')
          dispatch({
            type: 'query',
            payload: {
              page: location.query.page,
              pageSize: location.query.size,
              createTimeBegin: location.query.createTimeBegin,
              createTimeEnd: location.query.createTimeEnd,
              txType: location.query.txType,
              keyWord: location.query.keyWord === '' ? null : location.query.keyWord,
              // withdrawId: location.query.withdrawId === '' ? null : location.query.withdrawId,
              statusList: ['cancel', 'processing', 'success', 'failure'] || location.query.statusList,
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
