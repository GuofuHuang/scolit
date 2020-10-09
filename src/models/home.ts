import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';

// 轮播图
const CAROUSEL_URL = '/mock/11/carousel';

// 猜你喜欢
const GUESS_URL = '/mock/11/guess';

// 首页列表
const CHANNEL_URL = '/mock/11/channel';

export interface ICarousel {
  id: string;
  image: string;
  colors: [];
}

export interface IGuess {
  id: string;
  title: string;
  image: string;
}

export interface IChannel {
  id: string;
  title: string;
  image: string;
  remark: string;
  played: number;
  playing: number;
}

export interface HomeState {
  carousels?: ICarousel[];
  guess: IGuess[];
  channels: IChannel[];
}

interface HomeModel extends Model {
  namespace: 'home';
  state: {
    carousels: ICarousel[];
    guess: IGuess[];
    channels: IChannel[];
  };
  reducers: {
    setState: Reducer<HomeState>;
  };
  effects: {
    fetchCarousels: Effect;
    fetchGuess: Effect;
    fetchChannels: Effect;
  };
}

const initialState: HomeState = {
  carousels: [],
  guess: [],
  channels: [],
};

const homeModel: HomeModel = {
  namespace: 'home',
  state: {
    guess: [],
    carousels: [],
    channels: [],
  },
  reducers: {
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
    *fetchGuess(_, {call, put}) {
      const {data} = yield call(axios.get, GUESS_URL);
      yield put({
        type: 'setState',
        payload: {
          guess: data,
        },
      });
    },
    *fetchChannels(_, {call, put}) {
      const {data} = yield call(axios.get, CHANNEL_URL);
      yield put({
        type: 'setState',
        payload: {
          channels: data.results,
        },
      });
    },
  },
};

export default homeModel;
