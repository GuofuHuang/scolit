import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';
import category from '@/models/category';
import user from '@/models/user';
const models = [home, category, user];

export type RootState = {
  home: typeof home.state;
  user: typeof user.state;
  category: typeof category.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};

export default models;
