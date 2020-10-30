import React from 'react';
import {NavigationContainer, NavigationState} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Category from '@/pages/Category';
import Detail from '@/pages/Detail';
import {Platform, StyleSheet, StatusBar, Animated} from 'react-native';
import {getActiveRouteName, navigationRef} from '../utils';
import Login from '@/pages/Login';
// import SplashScreen from 'react-native-splash-screen';
import IconFont from '@/assets/iconfont';
import ProductCategory from '@/pages/ProductCategory';

export type RootStackParamList = {
  BottomTabs: {
    screen?: string;
  };
  ProductCategory: undefined;
  Category: undefined;
  Album: {
    item: {
      id: string;
      title: string;
      image: string;
    };
    opacity?: Animated.Value;
  };
  Detail: undefined;
};

export type RootStackNavigation = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator<RootStackParamList>();

const styles = StyleSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: '#fff',
    opacity: 0,
  },
  headerBackImage: {
    marginHorizontal: Platform.OS === 'android' ? 0 : 8,
  },
});

function RootStackScreen() {
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        ...Platform.select({
          android: {
            headerStatusBarHeight: StatusBar.currentHeight,
          },
        }),
        headerBackTitleVisible: false,
        headerTintColor: '#333',
        headerStyle: {
          ...Platform.select({
            android: {
              elevation: 0,
              borderBottomWidth: StyleSheet.hairlineWidth,
            },
          }),
        },
      }}>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerTitle: '首页',
        }}
      />
    </Stack.Navigator>
  );
}

export type ModalStackParamList = {
  Root: undefined;
  Detail: {
    id: string;
  };
  Login: undefined;
  ProductCategory: undefined;
  Category: undefined;
};

const ModalStack = createStackNavigator<ModalStackParamList>();

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>;

function ModalStackScreen() {
  return (
    <ModalStack.Navigator
      mode="modal"
      headerMode="screen"
      screenOptions={{
        headerTitleAlign: 'center',
        gestureEnabled: true,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        headerBackTitleVisible: false,
        headerTintColor: '#333',
      }}>
      <ModalStack.Screen
        name="Root"
        component={RootStackScreen}
        options={{headerShown: false}}
      />
      <ModalStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerTintColor: '#fff',
          headerTitle: '',
          headerTransparent: true,
          cardStyle: {backgroundColor: '#807c66'},
          headerBackImage: ({tintColor}) => (
            <IconFont
              name="iconhome"
              size={30}
              color={tintColor}
              style={styles.headerBackImage}
            />
          ),
        }}
      />
      <ModalStack.Screen
        name="ProductCategory"
        component={ProductCategory}
        options={{
          headerTitle: '物料类别',
        }}
      />
      <ModalStack.Screen
        name="Category"
        component={Category}
        options={{
          headerTitle: '物料类别',
        }}
      />
      <ModalStack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: '登录',
        }}
      />
    </ModalStack.Navigator>
  );
}

class Navigator extends React.Component {
  state = {
    routeName: 'Root',
  };
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  onStateChange = (state: NavigationState | undefined) => {
    if (typeof state !== 'undefined') {
      const routeName = getActiveRouteName(state);
      this.setState({
        routeName,
      });
    }
  };
  render() {
    return (
      <NavigationContainer
        ref={navigationRef}
        onStateChange={this.onStateChange}>
        <ModalStackScreen />
      </NavigationContainer>
    );
  }
}

export default Navigator;
