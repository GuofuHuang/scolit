import React from 'react';
import {StyleSheet, FlatList, Text, View, Modal} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {IProductCategory} from '@/models/productCategory';
import Touchable from '@/components/Touchable';
import AddModal from '@/pages/ProductCategory/addModal';

const mapStateToProps = ({productCategory, category}: RootState) => {
  return {
    productCategories: productCategory.productCategories,
    myCategorys: category.myCategorys,
    categories: category.categorys,
  };
};
const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
}

interface IState {
  productCategories: IProductCategory[];
}

class ProductCategory extends React.Component<IProps, IState> {
  state = {
    productCategories: this.props.productCategories,
    modalVisible: false,
    selectedId: '',
    selectedCategory: {
      _id: '',
      name: '',
    },
  };

  setModalVisible = (visible: boolean) => {
    this.setState(Object.assign({}, this.state, {modalVisible: visible}));
  };

  onPress = (item: IProductCategory) => {
    this.setState(
      Object.assign({}, this.state, {
        selectedId: item._id,
        selectedCategory: item,
        modalVisible: true,
      }),
    );
  };
  renderItem = ({index, item}: any) => {
    const backgroundColor =
      item._id === this.state.selectedId ? 'lightgray' : '#fff';
    return (
      <Touchable
        key={item._id}
        onPress={() => this.onPress(item)}
        style={[{backgroundColor}, styles.itemContainer]}>
        <Text style={styles.title}>{item.name}</Text>
      </Touchable>
    );
    // return <Item item={item.name} onPress={this.onPress} style={backgroundColor} />;
  };

  render() {
    const {productCategories, selectedCategory, modalVisible} = this.state;
    console.log('modal state', modalVisible);
    return (
      <View style={styles.mainContainer}>
        <AddModal modalVisible={modalVisible} />
        <View style={styles.topContainer}>
          <Text style={styles.topItemText}>当前类别: </Text>
          <Text style={styles.topItemText}>{selectedCategory.name}</Text>
        </View>
        <View style={styles.middleContainer}>
          <View style={styles.categoryContainer}>
            <View>
              <FlatList
                data={productCategories}
                keyExtractor={({_id}) => _id}
                renderItem={this.renderItem}
              />
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.addCategoryText}>增加</Text>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <Text>guofu2</Text>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomTextContainer}>
            <Text style={[styles.bottomText, styles.bottomLeftText]}>删除</Text>
          </View>
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>编辑</Text>
          </View>
        </View>
      </View>
    );
  }
}

const borderColor = 'black';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  topItemText: {
    padding: 10,
    fontSize: 15,
  },
  middleContainer: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: borderColor,
  },
  categoryContainer: {
    flex: 0.5,
    borderRightWidth: 1,
    borderRightColor: borderColor,
    alignItems: 'stretch',
  },
  itemContainer: {
    alignItems: 'center',
    padding: 15,
    width: '100%',
  },
  addCategoryText: {
    fontSize: 16,
    color: 'green',
  },
  title: {
    fontSize: 16,
  },
  bottomContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  bottomTextContainer: {
    borderWidth: 1,
  },
  bottomText: {
    fontSize: 20,
  },
  bottomLeftText: {
    color: 'red',
  },
});

export default connector(ProductCategory);
