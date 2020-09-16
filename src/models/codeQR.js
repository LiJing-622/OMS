import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import {
  templateListUrl,
  templateSaveWay, // 保存
  getUploadToken,
  deleteIDUrl, // 删除
  templateListEditWay, // 编辑
} from '../services/codeQR'
// eslint-disable-next-line import/first
import { routerRedux } from 'dva/router'
// import { compose } from 'redux'
// import { isBuffer } from 'util'
// import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'codeQR',

  state: {
    visible: false,
    currentItem: {},
    list: [],
    item: {},
    selectedRowKeys: [],
    modalVisible: false,
    withdrawModalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    titles: [],
    confirmLoading: true,
    uploadToken: '',
  },

  reducers: {
    fetchUploadTokenSuccess (state, { payload }) {
      return { ...state, uploadToken: payload }
    },
    // 获取七牛云上的图片地址
    uploadIconSuccess (state, action) {
      state.item.imageUrl = action.payload
      return { ...state, ...action }
    },
     // 获取所有模块
    querySuccess (state, action) {
      return { ...state, ...action.payload }
    },
   // 编辑更新
    selectChange (state, { payload }) {
      return { ...state, item: payload }
    },
    confirmLoading (state, action) {
      return { ...state, ...action.payload }
    },
    querySelectValue (state, action) {
      return { ...state, ...action.payload }
    },

    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    showWithdrawModal (state, action) {
      return { ...state, ...action.payload, withdrawModalVisible: true }
    },
    hideWithdrawModal (state, action) {
      return { ...state, ...action.payload, withdrawModalVisible: false }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    updatedItem (state, action) {
      return { ...state, ...action.payload }
    },
    deleteSuccess () {},
    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map(withdrawBills => {
        if (withdrawBills.id === newUser.id) {
          return { ...withdrawBills, ...newUser }
        }
        return withdrawBills
      })
      return { ...state, list: newList }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload, visible: true }
    },
    withdraw (state, action) {
      return { ...state, ...action.payload }
    },

  },

  effects: {
    // *query ({ payload }, { call, put }) {
    //   yield put({
    //     type: 'updateQueryKey',
    //     payload: { page: 1, keyword: '', ...payload },
    //   })
    //   const { success, data } = yield call(query, { ...payload })
    // },
    // 更新所有模板
    *templateListQuery ({ payload }, { call, put }) {
      const data = yield call(templateListUrl, { ...payload })
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },
    // 点击二维码保存
    *templateSaveWayQuery ({ payload }, { call, put }) {
      const data = yield call(templateSaveWay, { ...payload })
      if (data.success) {
        message.success(`${data.message}`)
        yield put(routerRedux.push({
          pathname: '/codeQR',
        }))
      } else {
        message.error(`添加失败! ${data.message}`)
      }
    },
    // 编辑二维码保存
    *templateListEditWay ({ payload }, { call, put }) {
      const data = yield call(templateListEditWay, { ...payload })
      if (data.success) {
        message.success(`${data.message}`)
        yield put(routerRedux.push({
          pathname: '/codeQR',
        }))
      } else {
        message.error(`添加失败! ${data.message}`)
      }
    },
    *deleteIDUrl ({ payload }, { call, put }) {
      const data = yield call(deleteIDUrl, payload)
      if (data.success) {
        message.success(`${data.message}`)
        yield put(routerRedux.push({
          pathname: '/codeQR',
        }))
      } else {
        message.error(`${data.message}`)
      }
    },
     // 更新获取七牛云token
    *fetchUploadToken ({ payload }, { call, put }) {
      const { token } = yield call(getUploadToken, payload)
      yield put({
        type: 'fetchUploadTokenSuccess',
        payload: token,
      })
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/codeQR').exec(location.pathname)
        const match1 = pathToRegexp('/codeQR/edit').exec(location.pathname)
        if (match1 !== null) {
          // 获取七牛云token
          dispatch({
            type: 'fetchUploadToken',
            payload: {
              bucket: 'jkgj-hosp',
            },
          })
        }
        if (match !== null) {
          dispatch({
            type: 'templateListQuery',
          })
        }
      })
    },
  },
})
