import { request, config } from '../utils'

const { api } = config
const { uploadTokenUrl, templateList, templateListSave, templateListEdit, deleteID } = api

export async function getUploadToken (params) {
  return request({
    url: uploadTokenUrl,
    method: 'get',
    data: params,
  })
}
export async function templateListUrl (params) {
  return request({
    url: templateList,
    method: 'get',
    data: params,
  })
}
export async function templateSaveWay (params) {
  return request({
    url: templateListSave,
    method: 'post',
    data: params,
  })
}
export async function templateListEditWay (params) {
  return request({
    url: templateListEdit,
    method: 'post',
    data: params,
  })
}
export async function deleteIDUrl (params) {
  return request({
    url: `${deleteID}/${params}`,
    method: 'delete',
    data: params,
  })
}
