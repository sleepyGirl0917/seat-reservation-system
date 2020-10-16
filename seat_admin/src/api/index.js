import axios from '@/config'

export function Login(data) {
  return axios.post('login', data, {
    isShowLoading: true
  })
}
