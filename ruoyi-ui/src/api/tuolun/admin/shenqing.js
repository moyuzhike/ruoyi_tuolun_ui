import request from '@/utils/request'


// 查询待办任务列表
export function getApplicationList(query) {
  return request({
    url: ' ',
    method: 'get',
    params: query
  })
}
