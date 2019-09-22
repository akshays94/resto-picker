import axios from 'axios'

const ZOMATO_API = 'https://developers.zomato.com/api/v2.1'

const ZOMATO_HTTP = axios.create({
  baseURL: ZOMATO_API
})

ZOMATO_HTTP.defaults.headers.common['user-key'] = `2faa4f94ed5b5b463891af9b330bdb9d`

export { ZOMATO_HTTP }
