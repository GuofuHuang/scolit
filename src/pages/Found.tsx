import React from 'react';
import {Button, Text, View} from 'react-native';
import {RootStackNavigation} from '@/navigator/index';

interface IProps {
  navigation: RootStackNavigation;
}

class Found extends React.Component<IProps> {
  onPress = () => {
    const {navigation} = this.props;
    // navigate('Category');
    navigation.navigate('Detail');
  };
  render() {
    return (
      <View>
        <Text>Home</Text>
        <Button title="跳转到详情页" onPress={this.onPress} />
      </View>
    );
  }
}

export default Found;
