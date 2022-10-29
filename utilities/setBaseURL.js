import config from '../nuxt.config.js'

export default function (path) {
  return config ? config.axios.baseURL + `/${path}` : ''
}
