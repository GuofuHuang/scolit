import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';
import category from '@/models/category';
import album from '@/models/album';
const models = [home, category, album];

export type RootState = {
  home: typeof home.state;
  category: typeof category.state;
  album: typeof album.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};

export default models;
