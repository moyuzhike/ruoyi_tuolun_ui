import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";


//查询申请单
export function listApplication(query) {
  return request({
    url: '',
    method: 'get',
    params: query
  })
}

export function getApplication() {
  return request({
    url: '',
    method: 'get'
  })
}


// 新增申请
export function addApplication(data) {
  return request({
    url: '',
    method: 'post',
    data: data
  })
}
