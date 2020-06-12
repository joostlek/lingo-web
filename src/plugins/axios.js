import axios from 'axios'

const api = {}
api.install = function (Vue) {
  const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://api.lingo.joostlek.dev/api/v1'
    : 'http://localhost:8080/api/v1';

  Vue.prototype.$api = axios.create({ baseURL: baseURL });
};

export default api;
