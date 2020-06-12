import axios from 'axios'
import { Service } from 'axios-middleware';
import DataMiddleware from '../middleware/DataMiddleware';

const api = {}
api.install = function (Vue) {
  const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://api.lingo.joostlek.dev/api/v1'
    : 'http://localhost:8080/api/v1';

    const apiInstance = axios.create({ baseURL: baseURL });

    const service = new Service(apiInstance);

    service.register([
        new DataMiddleware(),
    ]);
    Vue.prototype.$api = apiInstance;
};

export default api;
