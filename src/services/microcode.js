import { request, config } from '../utils'

const { api } = config
const { microcode, microcodeCode, microcodeFinish } = api

/**
 * 查询微代列表
 * @param {*} params
 */
export async function queryFn (params) {
  return request({
    url: microcode,
    method: 'get',
    data: params,
  })
}
export async function microcodeDetails (params) {
  return request({
    url: microcodeCode,
    method: 'get',
    data: params,
  })
}

export async function microcodeFinishSum (params) {
  return request({
    url: microcodeFinish,
    method: 'post',
    data: params,
  })
}
