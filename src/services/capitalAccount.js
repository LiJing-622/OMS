import { request, config } from '../utils'

const { api } = config
// 展示使用别的
const { balanceInfo, updateID } = api

// 获取资金账户列表

export async function query (params) {
  return request({
    url: balanceInfo,
    method: 'post',
    data: params,
  })
}
// 提交身份信息
export async function updateIDUrl (params) {
  return request({
    url: updateID,
    method: 'post',
    data: params,
  })
}
