import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common' // 分页
import { queryFn, microcodeDetails, microcodeFinishSum } from '../services/microcode' // 接口
import { getLocalStorageJson } from '../utils/storage' // 存值

export default modelExtend(pageModel, {
  namespace: 'microcode', // 挂载组件
  state: {
    currentItem: {},
    modalVisible: false, // 显示编辑
    from: {
      pageSize: 121112,
      page: 1,
      phone: '',
      withdrawStatus: '',
      startTime: null,
      endTime: null,
    },
    id: 0,
  },
  reducers: {
    // 显示弹框
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    // 取消弹窗
    hideModal (state, action) {
      return { ...state, ...action.payload, modalVisible: false }
    },
    code (state, action) {
      return { ...state, ...action.payload }
    },
    finish (state, action) {
      return { ...state, ...action.payload }
    },
    updateQueryKey (state, action) {
      return { ...state, ...action.payload }
    },
    createSuccess (state, action) {
      return { ...state, ...action.payload }
    },
  },
  // 异步获取接口
  effects: {
    *query ({ payload }, { call, put }) {
      yield put({
        type: 'updateQueryKey',
        payload: {
          page: 1, pageSize: 121212, keyword: '', ...payload,
        },
      })
      const { success, totalCount: total, page, pageSize, data } = yield call(queryFn, payload)
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
    *code ({ payload }, { call, put }) {
      const data = yield call(microcodeDetails, payload)
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
    *finish ({ payload }, { call, put }) {
      const data = yield call(microcodeFinishSum, payload)
      message.success(`修改成功! ${data.message}`)
      if (data.success) {
        yield put({
          type: 'hideModal',
          payload: {
            modalVisible: false,
          },
        })
      } else {
        message.error(`查询失败! ${data.message}`)
      }
    },

  },

  // 监听
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        const match = pathToRegexp('/microcode').exec(location.pathname)
        const match2 = pathToRegexp('/microcodeDetails/:id').exec(location.pathname)
        const match3 = pathToRegexp('/microcodeFinishSum').exec(location.pathname)
        console.log(match2)
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
              page: 1, pageSize: 121212,
            },
          })
        }
        if (match3) {
          const data = getLocalStorageJson('roles')
          if (!data) {
            dispatch({
              type: 'roles/updateCache',
            })
          }

          dispatch({
            type: 'finish',
            payload: location.query,
          })
        }
      }); // eslint-disable-line
    },
  },
})
