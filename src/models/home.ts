import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';

interface HomeState {
  num: number;
}

const action = {
  type: 'add',
};

interface HomeModel extends Model {
  namespace: 'home';
  state: {
    num: number;
  };
  reducers: {
    add: Reducer<HomeState>;
    setStatus: Reducer<HomeState>;
  };
  effects: {
    asyncAdd: Effect;
  };
}

const initialState = {
  num: 0,
};

function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const homeModel: HomeModel = {
  namespace: 'home',
  state: {
    num: 0,
  },
  reducers: {
    add(state = initialState, {payload}) {
      return {
        ...state,
        num: state?.num + payload.num,
      };
    },
    setStatus(state = initialState) {
      return {
        ...state,
      };
    },
  },
  effects: {
    *asyncAdd({payload}, {call, put}) {
      yield put({
        type: 'setStatus',
      });
      yield call(delay, 3000);
      yield put({
        type: 'add',
        payload,
      });
      yield put({
        type: 'setStatus',
      });
    },
  },
};

export default homeModel;
