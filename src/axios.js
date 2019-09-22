import axios from 'axios'

const ZOMATO_API = 'https://developers.zomato.com/api/v2.1'

const ZOMATO_HTTP = axios.create({
  baseURL: ZOMATO_API
})

ZOMATO_HTTP.defaults.headers.common['user-key'] = process.env.VUE_APP_APIKEY

export { ZOMATO_HTTP }
