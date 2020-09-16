import { request, config } from '../utils'

const { api } = config
// 展示使用别的
const { queryWithdrawRecord, remitConfirm } = api

// 获取资金账户列表
export async function query (params) {
  return request({
    url: queryWithdrawRecord,
    method: 'post',
    data: params,
  })
}
export async function remitConfirmQuery (params) {
  return request({
    url: remitConfirm,
    method: 'post',
    data: params,
  })
}
