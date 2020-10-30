import home from './home';
import {DvaLoadingState} from 'dva-loading-ts';
import category from '@/models/category';
import user from '@/models/user';
import productCategory from '@/models/productCategory';
const models = [home, category, user, productCategory];

export type RootState = {
  home: typeof home.state;
  user: typeof user.state;
  category: typeof category.state;
  productCategory: typeof productCategory.state;
  loading: DvaLoadingState;
} & {
  [key: string]: typeof home.state;
};

export default models;
