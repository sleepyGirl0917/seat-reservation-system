// 未封装axios
// import service from '@/config/httpConfig.js'
// export function Login(data) {
//   return service.request({ method: "post", url: 'login', data })
// }

// 封装axios
import Axios from '@/utils/axios.js'
export const Login = data => Axios('login', data, 'POST')