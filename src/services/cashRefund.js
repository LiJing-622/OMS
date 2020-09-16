import { request, config } from '../utils'

const { api } = config
// 展示使用别的
const { queryWithdrawRecord, cancelApply } = api

// 获取资金账户列表
export async function query (params) {
  return request({
    url: queryWithdrawRecord,
    method: 'post',
    data: params,
  })
}
// 取消提现申请
export async function cancelApplyStart (params) {
  return request({
    url: cancelApply,
    method: 'post',
    data: params,
  })
}
