import ITRequest from './index'

export function getUserList(params: any, options: any = undefined) {
  return ITRequest.get('/7inzVw/data', params, options)
}
export function getUserById(id: number) {
  return ITRequest.get(`/7inzVw/data/${id}`)
}
// export function getUserById(id: number, params?: any[] = []) {
//   return ITRequest.get(`/7inzVw/data/${id}`, params)
// }
export function addUser(userInfo: any) {
  return ITRequest.post('/7inzVw/data', userInfo)
}
export function deleteUserById(id: number) {
  return ITRequest.delete(`/7inzVw/data/${id}`)
}
export function editUser(id: number, userInfo: any) {
  return ITRequest.patch(`/7inzVw/data/${id}`, userInfo)
}
