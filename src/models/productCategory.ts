import {Model, Effect, SubscriptionsMapObject} from 'dva-core-ts';
import {Reducer} from 'redux';
import axios from 'axios';
import storage, {load} from '@/config/storage';

const PRODUCTCATEGORY_URL = '/product_category';

export interface IProductCategory {
  _id: string;
  name: string;
}

export interface ProductCategoryModelState {
  productCategories: IProductCategory[];
}

export interface ProductCategoryModel extends Model {
  namespace: 'productCategory';
  state: ProductCategoryModelState;
  effects: {
    getAll: Effect;
  };
  reducers: {
    setState: Reducer<ProductCategoryModelState>;
  };
  subscriptions: SubscriptionsMapObject;
}

const initalState = {
  productCategories: [],
};

const productCategoryModel: ProductCategoryModel = {
  namespace: 'productCategory',
  state: initalState,
  effects: {
    *getAll(_, {call, put}) {
      const productCategories = yield call(load, {key: 'productCategories'});
      if (productCategories) {
        yield put({
          type: 'setState',
          payload: {
            productCategories: productCategories,
          },
        });
        storage.save({
          key: 'productCategories',
          data: productCategories,
        });
      } else {
        console.log('message', 'yes');
      }
    },
  },
  reducers: {
    setState(state, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({dispatch}) {
      dispatch({type: 'getAll'});
    },
    asyncStorage() {
      storage.sync.productCategories = async () => {
        const {data} = await axios.get(PRODUCTCATEGORY_URL);
        console.log('get all data', data);
        return data;
      };
    },
  },
};

export default productCategoryModel;
