import React from 'react';
import {Text, View} from 'react-native';
import {IChannel} from '@/models/home';

interface IProps {
  data: IChannel;
}

class ChannelItem extends React.Component<IProps> {
  render() {
    return (
      <View>
        <Text>ChannelItems</Text>
      </View>
    );
  }
}

export default ChannelItem;
