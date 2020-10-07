import Navigator from '@/navigator/index';
import {Provider} from 'react-redux';
import store from '@/config/dva';
import React from 'react';
// export default Navigator;

export default class extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    )
  }
}
