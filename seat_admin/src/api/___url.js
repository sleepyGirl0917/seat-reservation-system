import service from '@/config/httpConfig.js'

export function login(data) {
  return service.request({ method: "get", url: '/user/login', data })
}