import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

const CAROUSEL_URL = '/mock/11/carousel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [];
}

export interface HomeState {
  num: number;
  carousels?: ICarousel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: {
    num: number;
    carousels: ICarousel[];
  };
  reducers: {
    add: Reducer<HomeState>;
    setStatus: Reducer<HomeState>;
    setState: Reducer<HomeState>;
  };
  effects: {
    asyncAdd: Effect;
    fetchCarousels: Effect;
  };
}

const initialState = {
  num: 0,
  carousels: [],
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
    carousels: [],
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
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchCarousels(_, {call, put}) {
      const {data} = yield call(axios.get, CAROUSEL_URL);
      console.log('轮播图', data);
      yield put({
        type: 'setState',
        payload: {
          carousels: data,
        },
      });
    },
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
