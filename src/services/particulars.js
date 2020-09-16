import { request, config } from '../utils'

const { api } = config
// 展示使用别的
const { accountDetailInfo, updateID } = api

// 获取身份列表
export async function query (params) {
  console.log('params', params)
  return request({
    url: accountDetailInfo,
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
