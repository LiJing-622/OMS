import { request, config } from '../utils'

const { api } = config
const { memberLogout, getMember, submitAudit } = api
/**
 * 查询视频订单
 * @param {*} params
 */

export async function query (params) {
  return request({
    url: memberLogout,
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
export async function submitAuditFun (params) {
  // console.log(params, 'params')
  const paramsStr = `?auditStatus=${params.auditStatus}&id=${params.id}&remark=${params.remark}&failureCause=${params.failureCause}`

  return request({
    url: submitAudit + paramsStr,
    method: 'post',
    data: params,
  })
}
