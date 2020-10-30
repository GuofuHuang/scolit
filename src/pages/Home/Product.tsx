import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Touchable from '@/components/Touchable';
import IconFont from '@/assets/iconfont';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {navigate} from '@/utils/index';

const connector = connect();
type ModelState = ConnectedProps<typeof connector>;

// type IProps = MaterialTopTabBarProps & ModelState;
interface IProps {
  navigation: RootStackNavigation;
}

class Product extends React.Component {
  onPress = () => {
    console.log('on touch');
  };
  goCategory = () => {
    navigate('ProductCategory');
  };
  goProduct = () => {};
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerView}>
          <Text>基础信息</Text>
        </View>
        <View style={styles.contentView}>
          <View style={styles.categoryView}>
            <Touchable onPress={this.goCategory}>
              <IconFont name="iconhome" color={'red'} size={30} />
              <Text>类别</Text>
            </Touchable>
          </View>
          <View style={styles.categoryView}>
            <Touchable onPress={this.onPress}>
              <IconFont name="iconhome" color={'red'} size={30} />
              <Text>物料</Text>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
  },
  headerView: {
    margin: 5,
  },
  contentView: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  categoryView: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Product;
