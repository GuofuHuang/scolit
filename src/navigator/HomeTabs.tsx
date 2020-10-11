import React from 'react';
import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import Home from '@/pages/Home/index';
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper';
import {StyleSheet} from 'react-native';
import {RootState} from '@/models/index';
import {connect, ConnectedProps} from 'react-redux';
import {ICategory} from '@/models/category';
import {createHomeModel} from '@/config/dva';

export type HomeParamList = {
  [key: string]: {
    namespace: string;
  };
};

const Tab = createMaterialTopTabNavigator();

const mapStateToProps = ({category}: RootState) => {
  return {
    myCateogrys: category.myCategorys,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {}

class HomeTabs extends React.Component<IProps> {
  renderScreen = (item: ICategory) => {
    createHomeModel(item.id);
    return (
      <Tab.Screen
        name={item.id}
        key={item.id}
        component={Home}
        options={{tabBarLabel: item.name}}
        initialParams={{
          namespace: item.id,
        }}
      />
    );
  };
  renderTabBar = (props: MaterialTopTabBarProps) => {
    return <TopTabBarWrapper {...props} />;
  };
  render() {
    const {myCateogrys} = this.props;
    return (
      <Tab.Navigator
        lazy
        tabBar={this.renderTabBar}
        sceneContainerStyle={styles.sceneContainer}
        tabBarOptions={{
          scrollEnabled: true,
          tabStyle: {
            width: 80,
          },
          indicatorStyle: {
            height: 4,
            width: 20,
            marginLeft: 30,
            borderRadius: 2,
            backgroundColor: '#f86442',
          },
          activeTintColor: '#f86442',
          inactiveTintColor: '#333',
        }}>
        {myCateogrys.map(this.renderScreen)}
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  sceneContainer: {
    backgroundColor: 'transparent',
  },
});

export default connector(HomeTabs);
