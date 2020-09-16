import { request, config } from '../utils'

const { api } = config
const { shareProfitID, updateID } = api

// 获取身份列表
export async function shareProfit (params) {
  return request({
    url: `${shareProfitID}/${params}`,
    method: 'get',
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
//

