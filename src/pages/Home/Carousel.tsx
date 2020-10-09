import React from 'react';
import SnapCarousel, {
  ParallaxImage,
  AdditionalParallaxProps,
  Pagination,
} from 'react-native-snap-carousel';
import {viewportWidth, wp, hp} from '@/utils/index';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {ICarousel} from '@/models/home';

interface IProps {
  data: ICarousel[];
}

const sliderWidth = viewportWidth;
// const sideWidth = wp(90);
const sideHeight = hp(26);
const itemWidth = wp(90) + wp(2) * 2;

class Carousel extends React.Component<IProps> {
  state = {
    activeSlide: 0,
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  renderItem = (
    {item}: {item: ICarousel},
    parallaxProps?: AdditionalParallaxProps,
  ) => {
    // return <Image source={{uri: item.image}} style={styles.image} />;
    return (
      <ParallaxImage
        source={{uri: item.image}}
        style={styles.image}
        containerStyle={styles.imageContainer}
        showSpinner
        spinnerColor="rgba(0, 0, 0, 0.25)"
        {...parallaxProps}
      />
    );
  };

  onSnapToItem = (index: number) => {
    this.setState({
      activeSlide: index,
    });
  };

  get pagination() {
    const {data} = this.props;
    const {activeSlide} = this.state;
    return (
      <View style={styles.paginationWrapper}>
        <Pagination
          containerStyle={styles.paginationContainer}
          dotContainerStyle={styles.dotContainer}
          dotStyle={styles.dotStyle}
          dotsLength={data.length}
          activeDotIndex={activeSlide}
          inactiveDotScale={0.7}
          inactiveDotOpacity={0.4}
        />
      </View>
    );
  }

  render() {
    const {data} = this.props;
    return (
      <View>
        <SnapCarousel
          data={data}
          renderItem={this.renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={this.onSnapToItem}
          hasParallaxImages
          autoplay
          loop
        />
        {this.pagination}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  imageContainer: {
    width: itemWidth,
    height: sideHeight,
    borderRadius: 8,
  },
  paginationWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    top: -20,
    paddingHorizontal: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingVertical: 4,
    borderRadius: 8,
  },
  dotContainer: {
    marginHorizontal: 6,
  },
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
  },
});

export default Carousel;
