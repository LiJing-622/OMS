import { request, config } from '../utils'

const { api } = config
const { recordList, getMember } = api
/**
 * 查询视频订单
 * @param {*} params
 */

export async function query (params) {
  return request({
    url: recordList,
    method: 'get',
    data: params,
  })
}
export async function queryVideoOrder (params) {
  return request({
    url: getMember,
    method: 'get',
    data: params,
  })
}
// export async function submitAuditFun (params) {
//   return request({
//     url: submitAudit,
//     method: 'get',
//     data: params,
//   })
// }
