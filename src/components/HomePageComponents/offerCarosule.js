import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

const ImageSlider = ({ text }) => {
  const [sliderWidth, setSliderWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateDimensions = () => {
      setSliderWidth(Dimensions.get('window').width);
    };

    // Event listener for screen orientation change
    Dimensions.addEventListener('change', updateDimensions);

    // Cleanup event listener on component unmount
    return () => {
      // No need to remove event listener, it will be automatically removed on unmount
    };
  }, []);

  const images = [
    'https://res.cloudinary.com/dlzcgycpi/image/upload/v1699262574/MicrosoftTeams-image_11_dcrmhz.png',
    'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700567839/MicrosoftTeams-image_12_m4prsr.png',
    'https://res.cloudinary.com/dlzcgycpi/image/upload/v1700567839/MicrosoftTeams-image_12_m4prsr.png',
    // Add more images as needed
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Special Offers</Text>
      </View>
      <SliderBox
        images={images}
        sliderBoxHeight={Dimensions.get('window').width * 0.5} // Responsive height
        parentWidth={sliderWidth} // Responsive width
        circleLoop={true}
        dotStyle={{ width: 12, height: 12, borderRadius: 6, marginHorizontal: 0, padding: 0 }}
        inactiveDotStyle={{ width: 12, height: 12, borderRadius: 6, marginHorizontal: 0, padding: 0 }}
        dotColor="#FFEBF5"
        inactiveDotColor="#B0BEC5"
        resizeMode="cover"
        ImageComponentStyle={{ borderRadius: 10, width: '95%' }} // Responsive margin
        imageLoadingColor="#2196F3"
        autoplay
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal:10
  },
  title: {
    fontSize: 14,
                maxWidth: '100%',
                color: '#333', // Text color
                fontWeight: '600',
                letterSpacing: 1,
  },
});

export default ImageSlider;
