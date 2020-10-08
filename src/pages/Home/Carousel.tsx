import React from 'react';
import SnapCarousel from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {Image, View} from 'react-native';
import {StyleSheet} from 'react-native';

const data = [
  'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
  'https://homepages.cae.wisc.edu/~ece533/images/arctichare.png',
];

const sliderWidth = viewportWidth;
// const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = wp(90) + wp(2) * 2;

class Carousel extends React.Component {
  renderItem = ({item}: {item: string}) => {
    return <Image source={{uri: item}} style={styles.image} />;
  };
  render() {
    return (
      <View>
        <SnapCarousel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: itemWidth,
    height: sideHeight,
  },
});

export default Carousel;
