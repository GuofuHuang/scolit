import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_URL;
// axios.defaults.headers = {
//   icode: '6F1D72C83F450609',
// };

axios.interceptors.request.use(
  function (config) {
    config.headers = {
      icode: '6F1D72C83F450609',
    };
    console.log('请求config', config);
    return config;
  },
  function (error) {
    console.log('error1', error);
    return error;
  },
);

axios.interceptors.response.use(
  function (response) {
    console.log('response', response);
    return response.data;
  },
  function (error) {
    console.log('error2', JSON.stringify(error));
    return error;
  },
);
