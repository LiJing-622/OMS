import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import modelExtend from 'dva-model-extend'
import { pageModel } from './common'
import { multiWithdrawBill, withdrawBill, shareProfit, updateIDUrl } from '../services/videoUSer'
// import { getLocalStorageJson } from '../utils/storage'

export default modelExtend(pageModel, {
  namespace: 'videoUser',
  state: {
    visible: false,
    list: [],
    listData: {},
    currentItem: {},
    doctor: {},
    listItem: {},
    selectedRowKeys: [],
    modalVisible: false,
    withdrawModalVisible: false,
    modalType: 'create',
    modalGrantVisible: false,
    targetKeys: [],
    selectedKeys: [],
    dataSource: [],
    doctorSource: [],
    vipSource: [],
    recruitDataOne: [],
    recruitDataTwo: [],
    recruitDataTree: [],
    recruitDataFour: [],
    titles: [],
    confirmLoading: true,
  },

  reducers: {
    // 获取初始话的值
    doctorSuccess (state, action) {
      return { ...state, ...action.payload }
    },
    doctorSuccessList (state, action) {
      return { ...state, ...action.payload }
    },
    confirmLoading (state, action) {
      return { ...state, ...action.payload }
    },
    querySelectValue (state, action) {
      return { ...state, ...action.payload }
    },
    selectChange (state, action) {
      return { ...state, ...action.payload, list: action.payload }
    },
    showModal (state, action) {
      return { ...state, ...action.payload, modalVisible: true }
    },
    hideModal (state) {
      return { ...state, modalVisible: false }
    },
    showWithdrawModal (state, action) {
      return { ...state, ...action.payload, withdrawModalVisible: true }
    },
    hideWithdrawModal (state, action) {
      return { ...state, ...action.payload, withdrawModalVisible: false }
    },
    listItemOne (state, action) {
      return { ...state, ...action.payload.listItem }
    },

    updateSuccess (state, action) {
      const newUser = action.payload
      const newList = state.list.map((withdrawBills) => {
        if (withdrawBills.id === newUser.id) {
          return { ...withdrawBills, ...newUser }
        }
        return withdrawBills
      })
      return { ...state, list: newList }
    },
    updateQueryKeyOne (state, action) {
      return { ...state, ...action.payload, visible: true }
    },
    updateQueryKey (state, action) {
      const newUser = action.payload

      return { ...state, titles: newUser }
    },
    dataSourceOne (state, action) {
      return { ...state, ...action.payload }
    },
  },

  effects: {
    // 初始化获取首页的数据
    *shareProfit ({ payload }, { call, put }) {
      // 参数为普通用户时
      if (payload === 'user') {
        // 获取数据
        const data = yield call(shareProfit, payload)
        // 成功以后的状态
        if (data.success) {
          // 当后台的数据为null
          if (data.data == null) {
            // 将数据更新为null
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: {},
                dataSource: [],
              },
            })
          } else {
            // 否则将数据更新到start上
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: data.data,
                dataSource: data.data.rules,
              },
            })
          }
        } else {
          // 否则失败直接提示错误信息
          message.error(data.message)
        }
      }
      if (payload === 'doctor') {
        const data = yield call(shareProfit, payload)
        if (data.success) {
          if (data.data == null) {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: {},
                doctorSource: [],
              },
            })
          } else {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: data.data,
                doctorSource: data.data.rules,
              },
            })
          }
        } else {
          message.error(data.message)
        }
      } else {
        if (payload === 'vip') {
          const data = yield call(shareProfit, payload)
          if (data.success) {
            if (data.data == null) {
              yield put({
                type: 'doctorSuccess',
                payload: {
                  doctor: {},
                  vipSource: [],
                },
              })
            } else {
              yield put({
                type: 'doctorSuccess',
                payload: {
                  doctor: data.data,
                  vipSource: data.data.rules,
                },
              })
            }
          } else {
            message.error(data.message)
          }
        }
      }
      if (payload === 'recruit-1') {
        const data = yield call(shareProfit, payload)
        if (data.success) {
          if (data.data == null) {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: {},
                recruitDataOne: [],
              },
            })
          } else {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: data.data,
                recruitDataOne: data.data.rules,
              },
            })
          }
        } else {
          message.error(data.message)
        }
      } else if (payload === 'recruit-2') {
        const data = yield call(shareProfit, payload)
        if (data.success) {
          if (data.data == null) {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: {},
                recruitDataTwo: [],
              },
            })
          } else {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: data.data,
                recruitDataTwo: data.data.rules,
              },
            })
          }
        } else {
          message.error(data.message)
        }
      } else if (payload === 'recruit-3') {
        const data = yield call(shareProfit, payload)
        if (data.success) {
          if (data.data == null) {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: {},
                recruitDataTree: [],
              },
            })
          } else {
            yield put({
              type: 'doctorSuccess',
              payload: {
                doctor: data.data,
                recruitDataTree: data.data.rules,
              },
            })
          }
        } else {
          message.error(data.message)
        }
      } else {
        if (payload === 'recruit-4') {
          const data = yield call(shareProfit, payload)
          if (data.success) {
            if (data.data == null) {
              yield put({
                type: 'doctorSuccess',
                payload: {
                  doctor: {},
                  recruitDataFour: [],
                },
              })
            } else {
              yield put({
                type: 'doctorSuccess',
                payload: {
                  doctor: data.data,
                  recruitDataFour: data.data.rules,
                },
              })
            }
          } else {
            message.error(data.message)
          }
        }
      }
    },
    *updateIDUrl ({ payload }, { call }) {
      const data = yield call(updateIDUrl, { ...payload })
      if (data.success) {
        message.success(` ${data.message}`)
      } else {
        message.error(`${data.message}`)
      }
    },
    *clickWithdraw ({ payload }, { put, select }) {
      const list = yield select(({ agenWB }) => agenWB.list)
      const { code } = payload
      let data
      list.map((val) => {
        val.code === code ? data = val : ''
        return true
      })
      if (data) {
        yield put({
          type: 'showWithdrawModal',
          payload: {
            currentItem: data,
          },
        })
      } else {
        message.error(` ${data.message}`)
      }
    },
    *withdraw ({ payload }, { call, put }) {
      const data = yield call(withdrawBill, payload)
      if (data.success) {
        yield put({
          type: 'hideWithdrawModal',
          payload: {
            currentItem: data,
          },
        })
        yield put({ type: 'query' })
      } else {
        message.error(`${data.message}`)
      }
    },
    *multiWithdraw ({ payload }, { call, put }) {
      if (payload.withdrawBillNoList.length === 0) {
        message.warning('批量提现不能为空！！！')
        return false
      }
      const data = yield call(multiWithdrawBill, payload)
      if (data.success) {
        yield put({ type: 'query' })
      } else {
        message.error(`${data.message}`)
      }
    },
    *dataSource ({ payload }, { put }) {
      console.log(payload, 'payload')
      // const { success } = yield call(token, { ...payload })
      // console.log(success, 'success')
      yield put({
        type: 'dataSourceOne',
        payload: payload,
      })
    },
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        // 根据路由名称来初始化请求数据
        const match = pathToRegexp('/videoUser').exec(location.pathname)
        if (match) {
          dispatch({
            type: 'shareProfit',
            payload: 'user',
          })
        }
      })
    },
  },
})
