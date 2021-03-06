import React from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootStackNavigation} from '@/navigator/index';
import {RootState} from '@/models/index';
import Carousel, {sideHeight} from './Carousel';
import ChannelItem from '@/pages/Home/ChannelItem';
import {IChannel, IGuess} from '@/models/home';
import {HomeParamList} from '@/navigator/HomeTabs';
import {RouteProp} from '@react-navigation/native';
import Guess from '@/pages/Home/Guess';

const mapStateToProps = (
  state: RootState,
  {route}: {route: RouteProp<HomeParamList, string>},
) => {
  const {namespace} = route.params;
  const modelState = state[namespace];
  return {
    namespace,
    carousels: modelState.carousels,
    channels: modelState.channels,
    hasMore: modelState.pagination.hasMore,
    loading: state.loading.effects[namespace + '/fetchChannels'],
    gradientVisible: modelState.gradientVisible,
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface IProps extends ModelState {
  navigation: RootStackNavigation;
  namespcae: string;
}

interface IState {
  refreshing: boolean;
}

class Home extends React.Component<IProps, IState> {
  state = {
    refreshing: false,
  };
  componentDidMount() {
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchCarousels',
    });
    dispatch({
      type: namespace + '/fetchChannels',
    });
  }

  goAlbum = (data: IChannel | IGuess) => {
    console.log('data', data);
    const {navigation} = this.props;
    navigation.navigate('Album', {item: data});
  };

  renderItem = ({item}: ListRenderItemInfo<IChannel>) => {
    return <ChannelItem data={item} onPress={this.goAlbum} />;
  };
  get header() {
    const {namespace} = this.props;
    return (
      <View>
        <Carousel />
        {/*<Product navigation={this.props.navigation} />*/}
        <View style={styles.background}>
          <Guess namespace={namespace} goAlbum={this.goAlbum} />
        </View>
      </View>
    );
  }
  keyExtractor = (item: IChannel) => {
    return item.id;
  };

  // 加载更多
  onEndReached = () => {
    const {dispatch, loading, hasMore, namespace} = this.props;
    if (loading || !hasMore) {
      return;
    }
    dispatch({
      type: namespace + '/fetchChannels',
      payload: {
        loadMore: true,
      },
    });
  };

  get footer() {
    const {hasMore, loading, channels} = this.props;
    if (!hasMore) {
      return (
        <View style={styles.end}>
          <Text>-我是有底线的-</Text>
        </View>
      );
    }
    if (loading && hasMore && channels.length > 0) {
      return (
        <View style={styles.loading}>
          <Text>正在加载中</Text>
        </View>
      );
    }
  }
  get empty() {
    const {loading} = this.props;
    if (loading) {
      return;
    }
    return (
      <View style={styles.empty}>
        <Text>暂无数据</Text>
      </View>
    );
  }
  onRefresh = () => {
    // 1. 修改刷新状态为true
    this.setState({
      refreshing: true,
    });
    // 2. 获取数据
    const {dispatch, namespace} = this.props;
    dispatch({
      type: namespace + '/fetchChannels',
      callback: () => {
        // 3. 修改刷新状态为false
        this.setState({
          refreshing: false,
        });
      },
    });
  };
  onScroll = ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = nativeEvent.contentOffset.y;
    const {namespace} = this.props;
    let newGradientVisible = offsetY < sideHeight;
    const {dispatch, gradientVisible} = this.props;
    if (gradientVisible !== newGradientVisible) {
      dispatch({
        type: namespace + '/setState',
        payload: {
          gradientVisible: newGradientVisible,
        },
      });
    }
  };
  render() {
    const {channels} = this.props;
    const {refreshing} = this.state;
    return (
      <FlatList
        ListHeaderComponent={this.header}
        ListFooterComponent={this.footer}
        ListEmptyComponent={this.empty}
        data={channels}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.2}
        onRefresh={this.onRefresh}
        refreshing={refreshing}
        onScroll={this.onScroll}
      />
    );
  }
}

const styles = StyleSheet.create({
  end: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loading: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: 100,
  },
  background: {
    backgroundColor: 'white',
  },
});

export default connector(Home);
